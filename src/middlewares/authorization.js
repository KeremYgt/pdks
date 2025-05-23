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
		// tokeni decode ve verify edip req.user değişkenine bindiriyoruz;s
		req.user = helpers.token.jwt.verify(req.headers.authorization);
		if (req.user) {
			// req.user ı db den çekip tüm bilgileri yeniliyoruz;
			req.user = await repositories.user.getByIdForLogin(req.user.user_id, req.headers.authorization);
			// user bilgilerini object biçimde erişebilir kılıyoruz.
			req.user.token = req.headers.authorization;
			req.user.today = new helpers.date.kk_date().format('YYYY-MM-DD');
			const token_is_active = req.user.user_tokens.find((token) => token.token === req.user.token);
			if (!token_is_active) {
				throw new constants.errors.UnAuth('middlewares.authorization', 'user token is not verify!');
			}
			delete req.user.user_tokens;
			return next();
		}
		throw new constants.errors.UnAuth('middlewares.authorization', 'user token is not verify!');
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};
