const helpers = require('../../helpers');
const repositories = require('../../repositories');
const constants = require('../../constants');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();
	try {
		const hashedPassword = await helpers.auth.hashPassword(req.body.password);

		const query = await repositories.user.register(req.body.email, hashedPassword);

		responseBody.result = query;
	} catch (error) {
		responseBody = helpers.error.catcher(error);
	}
	return res.status(responseBody.httpStatus).json(responseBody);
};
