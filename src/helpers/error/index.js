module.exports.logger = require('./logger');
const constants = require('../../constants');

const isNotWarnList = [
	constants.errors.BadRequest,
	constants.errors.Forbidden,
	constants.errors.ServerError,
	constants.errors.DbError,
	constants.errors.Frontend,
];

/**
 * Handling & Loggin errors and create response
 *
 * @param {Error} error
 * @returns
 */
module.exports.catcher = (error) => {
	const response = {
		status: false,
		errorCode: null,
		operation: null,
		httpStatus: 500,
		desc: '',
		result: {},
	};
	try {
		if (
			error instanceof constants.errors.BadRequest ||
			error instanceof constants.errors.Conflict ||
			error instanceof constants.errors.Forbidden ||
			error instanceof constants.errors.GtfsWrongParam ||
			error instanceof constants.errors.NotFound ||
			error instanceof constants.errors.MissingField ||
			error instanceof constants.errors.ServerError ||
			error instanceof constants.errors.DateRangeProblem ||
			error instanceof constants.errors.DbError ||
			error instanceof constants.errors.UnAuth ||
			error instanceof constants.errors.WrongParam ||
			error instanceof constants.errors.Frontend ||
			error instanceof constants.errors.RepositoryError ||
			error instanceof constants.errors.ValidationError ||
			error instanceof constants.errors.MaintenanceMode ||
			error instanceof constants.errors.PastDateOperate ||
			error instanceof constants.errors.QueLocked ||
			error instanceof constants.errors.CaptchaWrong
		) {
			response.isWarn = true;
			if (isNotWarnList.some((errorType) => error instanceof errorType)) {
				response.isWarn = false;
			}
			response.desc = `${`${error.name} - ${error.message}`}`;
			response.operation = error.operation || '';
			if ([constants.CONFIG.ENV.TEST, constants.CONFIG.ENV.DEV].includes(process.env.NODE_ENV) === false) {
				delete response.stack;
			} else {
				response.stack = error.stack || '';
			}
			response.httpStatus = error.httpStatus || 500;
			response.errorCode = error.errorCode || null;
			response.status = false;
			response.result = error.result || {};
			this.logger(error, response.isWarn);
			return response;
		}
		response.desc = `${`${error.name || '?'} ${error.message || ' ?'} + Server Error`}`;
		response.operation = `helpers.error.catcher${error.operation ? ` + ${error.operation}` : ''}`;
		if ([constants.CONFIG.ENV.TEST, constants.CONFIG.ENV.DEV].includes(process.env.NODE_ENV) === false) {
			delete response.stack;
		} else {
			response.stack = error.stack || '?';
		}
		response.errorCode = error.errorCode || null;
		response.httpStatus = error.httpStatus || 500;
		response.result = error.result || {};
		this.logger(error, false);
	} catch (error2) {
		response.desc = `${error2.message} - ${error.message || 'Server Error'}`;
		response.operation = `helpers.error.catcher + ${error.operation || '?'}`;
		response.stack = `${error2.stack || '?'} <==+==> ${error.stack || '?'}`;
		response.httpStatus = error2.httpStatus || 500;
		response.errorCode = error2.errorCode || null;
		response.result = error2.result || {};
		this.logger(error2, false);
	}
	response.errorCode = error.errorCode || null;
	response.status = false;
	response.result = error.result || {};
	return response;
};
