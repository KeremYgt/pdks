const constants = require('../../constants');
const argon2 = require('argon2');
const errors = require('../error');

/**
 * password hash
 *
 * @param {string} password
 * @return {string}
 */
module.exports.hashPassword = async (password) => {
	try {
		const hash = await argon2.hash(password);
		return hash;
	} catch (err) {
		throw new constants.errors.BadRequest('helpers.auth.hashPassword', 'password hash error!');
	}
};

/**
 * password hash verify
 *
 * @param {string} plainPassword
 * @param {string} hash
 * @return {boolean}
 */
module.exports.verifyPassword = async (plainPassword, hash) => {
	try {
		return await argon2.verify(hash, plainPassword);
	} catch (err) {
		errors.logger(err);
		throw new constants.errors.ServerError('helpers.auth.hashPassword', 'password verify error!');
	}
};
