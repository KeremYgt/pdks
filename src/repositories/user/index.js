const helpers = require('../../helpers');
const constants = require('../../constants');
const db = require('../../db');

module.exports.register = async (email, password) => {
	const user_id = db.MongoDB.id();
	await new db.MongoDB.CRUD('db_name', 'users').insert({
		user_id: user_id,
		email,
		password,
		created_at: new helpers.date.kk_date().getTime(),
	});

	return await this.getById(user_id);
};

/**
 * user get by id
 * @param {Object} id mongodb object id
 * @returns {Promise<Object>}
 */
module.exports.getById = async (id) => {
	const query = await new db.MongoDB.CRUD('db_name', 'users').aggregate([
		{
			$match: { user_id: id },
		},
		{
			$project: {
				_id: false,
				password: false,
				updated_at: false,
				created_at: false,
			},
		},
	]);
	if (query.length < 1) {
		throw new constants.errors.NotFound('repositories.user.getById', 'not found user !');
	}
	return query[0];
};

/**
 * login session save with token
 *
 * @param {Object} user_id mongodb object id
 * @param {String} token login token
 * @returns {Promise<Object>}
 */
module.exports.loginTokenSave = async (user_id, token, browser = null) => {
	await new db.MongoDB.CRUD('db_name', 'user_tokens').insert({
		user_id,
		token,
		browser,
		token_type: 'login',
		created_at: new helpers.date.kk_date().getTime(),
		created_from: 'system',
		status: true,
	});
	return true;
};

module.exports.login = async (email) => {
	const query = await new db.MongoDB.CRUD('pdks', 'users').aggregate([
		{
			$match: { email },
		},
		{
			$project: {
				_id: false,
			},
		},
	]);
	if (query.length > 0) {
		return query[0];
	}
	throw new constants.errors.NotFound('repositories.user.login', 'not found !');
};

module.exports.delete = async (user_id) => {
	const result = await new db.MongoDB.CRUD('pdks', 'user').deleteOne({
		user_id,
	});

	throw new constants.errors.NotFound('repositories.user.login', 'not found !');
};

module.exports.list = async () => {
	const crud = new db.MongoDB.CRUD('pdks', 'users');
	return await crud.find({}, [0, 100]);
};

module.exports.getByIdForLogin = async (user_id) => {
	try {
		const result = await new db.MongoDB.CRUD('pdks', 'users').find({ user_id }, [0, 1]); // Sadece 1 veri çek
		return result[0] || null; // Sonuç varsa ilkini al
	} catch (error) {
		console.error('getByIdForLogin error:', error);
		throw new Error('Kullanıcı bilgileri alınamadı.');
	}
};

module.exports.update = async (user_id, updateData) => {
	return await new db.MongoDB.CRUD('pdks', 'users').update(user_id, updateData);
};

// Kullanıcıyı ID'ye göre bul
module.exports.findById = async (user_id) => {
	return await new db.MongoDB.CRUD.findOne({ user_id });
};

// Kullanıcının aktiflik durumunu güncelle
module.exports.updateActiveStatus = async (user_id, is_active) => {
	return await new db.MongoDB.CRUD.updateOne({ user_id }, { $set: { is_active } });
};
