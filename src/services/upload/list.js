const helpers = require('../../helpers');
const constants = require('../../constants');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();
	try {
		responseBody.result = await repositories.uploads.list(req.user.user_id, req.body.type, req.body.skip, req.body.limit);
	} catch (error) {
		responseBody = helpers.error.catcher(error);
	}
	return res.status(responseBody.httpStatus).json(responseBody);
};
