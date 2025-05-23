const constants = require('../constants');
const helpers = require('../helpers');

/**
 * This middleware for auth mechanism.
 */
module.exports = async (req, res, next) => {
	try {
		const isAdmin = helpers.auth.isAdmin(req.user);
		if (isAdmin) {
			return next();
		}
		throw new constants.errors.Forbidden('middlewares.admin', 'forbidden request!');
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};
