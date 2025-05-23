const helpers = require('../../helpers');
const constants = require('../../constants');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();
	responseBody.result = {
		user: null,
		token: null,
	};

	try {
		const query = await repositories.user.login(req.body.email);
		// Parolayı doğrula
		const isPasswordValid = await helpers.auth.verifyPassword(req.body.password, query.password);
		if (!isPasswordValid) {
			throw new constants.errors.NotFound('services.user.login', 'Not found!');
		}
		delete query.password;
		responseBody.result.token = helpers.token.jwt.create(query);
		if (!responseBody.result.token) {
			throw new constants.errors.ServerError('services.user.login', 'token cant create!');
		}

		responseBody.result.user = query;
		repositories.user.loginTokenSave(query.user_id, responseBody.result.token);
		return res.status(responseBody.httpStatus).json(responseBody);
	} catch (error) {
		responseBody = helpers.error.catcher(error);
		return res.status(responseBody.httpStatus).json(responseBody);
	}
};
//