const jwt = require('jsonwebtoken');
const helpers = require('../');

/**
 * jwt token create with options
 *
 * @param {Object} data
 * @param {Object} options
 * @returns
 */
module.exports.create = (data, options) => {
	try {
		return jwt.sign(data, process.env.JWT_SECRET_KEY, options);
	} catch (error) {
		helpers.error.logger(error);
	}
	return false;
};

/**
 * jwt token verify and decode
 *
 * @param {String} token
 * @returns
 */
module.exports.verify = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET_KEY);
	} catch (error) {
		helpers.error.logger(error);
	}
	return false;
};
