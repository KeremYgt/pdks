const constants = require('../constants');
const helpers = require('../helpers');
const repositories = require('../repositories');
/**
 * This middleware for auth mechanism.
 */
module.exports = async (req, res, next) => {
	try {
		if (typeof req.headers.authorization === 'undefined' || typeof req.headers.authorization !== 'string' || req.headers.authorization.length < 1) {
			throw new constants.errors.UnAuth('middlewares.authorization', 'unauth request!');
		}
		// tokeni decode ve verify edip req.user değişkenine bindiriyoruz;
		req.user = helpers.token.jwt.verify(req.headers.authorization);
		if (req.user) {
			// req.user ı db den çekip tüm bilgileri yeniliyoruz;
			req.user = await repositories.user.getByIdForLogin(req.user.user_id);
			// user bilgilerini object biçimde erişebilir kılıyoruz.

			return next();
		}
		throw new constants.errors.UnAuth('middlewares.authorization', 'user token is not verify!');
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};
