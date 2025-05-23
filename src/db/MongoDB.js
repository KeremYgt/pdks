const { MongoClient, ObjectId } = require('mongodb');
const { customAlphabet } = require('nanoid');
const constants = require('../constants');
const helpers = require('../helpers');

/*
 * @class
 * @alias module:Bar
 * @param {connection} MongoClient
 */
const connection = { reader: false, writer: false };

module.exports.connector = async (dbVariable, connectionString = null) => {
	try {
		const uri = connectionString
			? connectionString
			: process.env.MONGODB_USER && process.env.MONGODB_PASS
				? `mongodb://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASS)}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/admin?compressors=zstd`
				: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/admin?compressors=zstd`;
		const mongoClient = new MongoClient(uri, {
			minPoolSize: constants.db.MongoDB.connection.minPoolSize[dbVariable],
			maxPoolSize: constants.db.MongoDB.connection.maxPoolSize[dbVariable],
			connectTimeoutMS: constants.db.MongoDB.connection.connectTimeoutMS,
			compressors: ['zstd'],
		});
		connection[dbVariable] = await mongoClient.connect();
		helpers.error.logger(`MongoDB -> ${process.env.NODE_ENV} connected (${dbVariable})`, true);
		return connection[dbVariable];
	} catch (error) {
		helpers.error.logger(error);
		await helpers.general.sleeper(1500);
		return await this.connector(dbVariable);
	}
};

function connect() {
	if (!connection.reader || !connection.writer) {
		throw new constants.errors.DbError('db.MongoDB.connect', 'connection is false');
	}
	return connection;
}

/**
 * MongoDB CRUD Operation class
 */
class CRUD {
	/**
	 * constructor for mongodb
	 *
	 * @param {String} db
	 * @param {String} collection
	 */
	constructor(db, collection) {
		this.db = db;
		if (!constants.db.MongoDB.generalDbs.includes(db)) {
			this.db = `${db}`;
		}
		this.collection = collection;
		if (process.env.NODE_ENV === constants.CONFIG.ENV.development) {
			this.db = `dev_${this.db}`;
		}
		if (process.env.NODE_ENV === constants.CONFIG.ENV.TEST) {
			this.db = `test_${this.db}`;
		}
		connect();
	}

	/**
	 *
	 * Find operator for mongodb
	 *
	 * @param {Object} query
	 * @param {Array} limit
	 * @param {Object} project
	 * @param {Object} sort
	 * @param {Object} options
	 * @returns {Promise<Array>}
	 */
	async find(query = {}, limit = [0, 10], project = {}, sort = {}, collation = {}) {
		return await connection.reader
			.db(this.db)
			.collection(this.collection)
			.find(query)
			.sort(sort)
			.collation(collation)
			.skip(limit[0])
			.limit(limit[1])
			.project(project)
			.toArray();
	}

	/**
	 * Count data with query
	 *
	 * @param {Object} query
	 * @returns
	 */
	async count(query = {}) {
		return await connection.reader.db(this.db).collection(this.collection).countDocuments(query);
	}

	/**
	 * mongodb insert operator for object
	 *
	 * @param {Object} data
	 * @returns
	 */
	async insert(data = null) {
		await connection.writer.db(this.db).collection(this.collection).insertOne(data);
		return true;
	}

	/**
	 * mongodb insert operator for array
	 *
	 * @param {Array} data
	 * @returns
	 */
	async insertMany(data = null) {
		await connection.writer.db(this.db).collection(this.collection).insertMany(data, { raw: false, bypassDocumentValidation: true });
		return true;
	}

	/**
	 * mongodb update operator for multiple or single
	 *
	 * @param {Object} query
	 * @param {Object} update
	 * @param {Boolean} multiple
	 * @returns
	 */
	async update(query = null, update = null, multiple = false) {
		if (multiple) {
			await connection.writer.db(this.db).collection(this.collection).updateMany(query, update);
		} else {
			await connection.writer.db(this.db).collection(this.collection).updateOne(query, update);
		}
		return true;
	}

	/**
	 * mongodb bulkWrite
	 *
	 * @param {Object} bulkWrite
	 * @returns
	 */
	async bulkWrite(bulkWrite) {
		await connection.writer.db(this.db).collection(this.collection).bulkWrite(bulkWrite);
		return true;
	}

	/**
	 * mongodb delete operation for delete multiple document
	 *
	 * @param {Object} query
	 * @returns
	 */
	async delete(query = null) {
		await connection.writer.db(this.db).collection(this.collection).deleteMany(query);
		return true;
	}

	/**
	 * mongodb delete operation for delete multiple document
	 *
	 * @param {Object} query
	 * @returns
	 */
	async deleteOne(query = null) {
		await connection.writer.db(this.db).collection(this.collection).deleteOne(query);
		return true;
	}

	/**
	 * mongodb aggregation pipelines
	 *
	 * @param {Object} pipeline aggregation pipeline stages
	 */
	async aggregate(pipeline = null) {
		return await connection.reader.db(this.db).collection(this.collection).aggregate(pipeline, { allowDiskUse: true }).toArray();
	}

	/**
	 * mongodb get collection list
	 *
	 */
	async listCollection() {
		return await connection.reader.db(this.db).listCollections().toArray();
	}
	/**
	 * mongodb get collection indexes
	 *
	 * @param {Object} pipeline aggregation pipeline stages
	 */
	async indexList() {
		return await connection.reader.db(this.db).collection(this.collection).listIndexes().toArray();
	}

	/**
	 *
	 * @param {object} data
	 * @returns
	 */
	async indexCreate(data) {
		await connection.writer.db(this.db).collection(this.collection).createIndex(data);
		return true;
	}

	/**
	 *
	 * @param {object} data
	 * @returns
	 */
	async indexDrop(key) {
		await connection.writer.db(this.db).collection(this.collection).dropIndex(key);
		return true;
	}
}

module.exports.id = customAlphabet(constants.db.MongoDB.idAlphabet, 18);
module.exports.idCustom = customAlphabet;
module.exports.CRUD = CRUD;
module.exports.ObjectId = ObjectId;
module.exports.connect = connect;
