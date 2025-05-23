const constants = require('../../constants');
const helpers = require('../../helpers');
const db = require('../../db');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3bucket = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
	region: constants.upload.region.UPLOAD,
	Bucket: null,
});

module.exports.location_list_upload = async (file) => {
	const region = constants.upload.region.UPLOAD;
	let Bucket = constants.upload.buckets.PROJECT;

	if (process.env.NODE_ENV === constants.CONFIG.ENV.DEV) {
		Bucket = constants.upload.buckets.PROJECT_DEV;
	}
	if (process.env.NODE_ENV === constants.CONFIG.ENV.TEST) {
		Bucket = constants.upload.buckets.PROJECT_TEST;
	}
	const Key = `location_list/${db.MongoDB.id()}_data.msgpack`;
	const uploadData = {
		Bucket,
		Key,
		Body: file,
		Region: region,
	};
	const command = new PutObjectCommand(uploadData);
	const upload = await s3bucket.send(command);
	if (!upload) {
		return false;
	}
	return {
		bucket: Bucket,
		region: region,
		url: `https://${Bucket}.s3.${region}.amazonaws.com/${Key}`,
		key: Key,
		created_at: new helpers.date.kk_date().format('X'),
	};
};

module.exports.create = async (file, type, user_id) => {
	let Bucket = constants.upload.buckets.PROJECT;
	const region = constants.upload.region.UPLOAD;

	if (process.env.NODE_ENV === constants.CONFIG.ENV.DEV) {
		Bucket = constants.upload.buckets.PROJECT_DEV;
	}
	if (process.env.NODE_ENV === constants.CONFIG.ENV.TEST) {
		Bucket = constants.upload.buckets.PROJECT_TEST;
	}
	const Key = `${user_id}/${db.MongoDB.id()}.${file.mimetype.split('/').pop()}`;
	const uploadData = {
		Bucket,
		Key,
		Body: file.data,
	};
	const command = new PutObjectCommand(uploadData);
	const upload = await s3bucket.send(command);
	if (!upload) {
		return false;
	}
	new db.MongoDB.CRUD('db_name', 'user_uploads').insert({
		user_id,
		bucket: Bucket,
		region: region,
		type,
		url: `https://${Bucket}.s3.${region}.amazonaws.com/${Key}`,
		key: Key,
		created_at: new helpers.date.kk_date().format('X'),
	});
	return upload;
};
