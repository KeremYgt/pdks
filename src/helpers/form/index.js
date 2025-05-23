/* eslint-disable no-useless-escape */
const constants = require('../../constants');

/**
 * email validator returns Boolean
 *
 * @param {string} email test@test.com
 * @returns {Boolean}
 */
module.exports.isEmailValid = (email = '') => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email.toString()).toLowerCase());
};

/**
 * form body cleaner
 *
 * @param {object} data
 * @param {array} allowedKeys
 * @returns {Object}
 */
module.exports.formCleaner = (data, allowedKeys = []) => {
	if (Array.isArray(data)) {
		if (allowedKeys.length < 1) {
			return data;
		}
		for (let index = 0; index < data.length; index++) {
			for (const property in data[index]) {
				if (!allowedKeys.includes(property)) {
					delete data[index][property];
				}
			}
		}
		return data;
	}
	if (typeof data === 'object') {
		for (const property in data) {
			if (!allowedKeys.includes(property)) {
				delete data[property];
			}
		}
		return data;
	}
	throw new constants.errors.ServerError('helpers.form.formCleaner', 'form cleaner data type problem !');
};
