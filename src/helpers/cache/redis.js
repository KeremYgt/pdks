const helpers = require('../../helpers');
const constants = require('../../constants');
const asyncRedis = require('async-redis');

let redisClient = false;
let asyncRedisClient;

/**
 * Redis Connector
 */
module.exports.connector = () => {
	try {
		asyncRedisClient = asyncRedis.createClient({
			url: `redis://:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
			read_timeout: 2,
			retry_strategy: 1,
		});

		asyncRedisClient.on('connect', () => {
			helpers.error.logger('Redis -> Connected', true);
			redisClient = true;
		});
		asyncRedisClient.on('error', (error) => {
			helpers.error.logger(error);
			redisClient = false;
		});
	} catch (error) {
		helpers.error.logger(error);
		throw new constants.errors.ServerError('helpers.cache.redis', 'redis connection error!');
	}
	return true;
};

/**
 * get data with key
 *
 * @param {String} key
 * @returns
 */
module.exports.get = async (key) => {
	try {
		if (!redisClient) {
			throw new constants.errors.ServerError('helpers.cache.redis', 'redis connection problem');
		}
		return await asyncRedisClient.get(`project/${key}`);
	} catch (error) {
		helpers.error.logger(error);
		throw new constants.errors.ServerError('helpers.cache.redis', `redis get error ${error.message || ''}`);
	}
};

/**
 * set data with key
 *
 * @param {String} key
 * @param {String} value
 * @param {number} ttl
 * @returns
 */
module.exports.set = async (key, value) => {
	try {
		if (!redisClient) {
			throw new constants.errors.ServerError('helpers.cache.redis', 'redis connection problem');
		}
		return await asyncRedisClient.set(`project/${key}`, value);
	} catch (error) {
		helpers.error.logger(error);
		throw new constants.errors.ServerError('helpers.cache.redis', `redis set error ${error.message || ''}`);
	}
};

/**
 * set data with key
 *
 * @param {String} key
 * @param {String} value
 * @param {number} ttl
 * @returns
 */
module.exports.setTTL = async (key, value, ttl) => {
	try {
		if (!redisClient) {
			throw new constants.errors.ServerError('helpers.cache.redis', 'redis connection problem');
		}
		return await asyncRedisClient.SETEX(`project/${key}`, ttl, value);
	} catch (error) {
		helpers.error.logger(error);
		throw new constants.errors.ServerError('helpers.cache.redis', `redis setTTL error ${error.message || ''}`);
	}
};

/**
 * delete data with key
 *
 * @param {String} key
 * @returns
 */
module.exports.del = async (key) => {
	try {
		if (!redisClient) {
			throw new constants.errors.ServerError('helpers.cache.redis', 'redis connection problem');
		}
		return await asyncRedisClient.del(`project/${key}`);
	} catch (error) {
		helpers.error.logger(error);
		throw new constants.errors.ServerError('helpers.cache.redis', `redis del error ${error.message || ''}`);
	}
};
