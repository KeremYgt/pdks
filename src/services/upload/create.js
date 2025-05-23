const helpers = require('../../helpers');
const constants = require('../../constants');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();
	try {
		responseBody.result = await helpers.upload.create(req.files.file, req.body.type, req.user.user_id);
	} catch (error) {
		responseBody = helpers.error.catcher(error);
	}
	return res.status(responseBody.httpStatus).json(responseBody);
};
