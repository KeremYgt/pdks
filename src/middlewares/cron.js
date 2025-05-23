const constants = require('../constants');
const helpers = require('../helpers');

/**
 * This middleware for auth mechanism.
 */
module.exports = async (req, res, next) => {
	try {
		if (req.headers.authorization !== constants.CONFIG.CRON_KEY) {
			throw new constants.errors.UnAuth('middlewares.cron', 'token is not verify!');
		}

		return next();
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};
