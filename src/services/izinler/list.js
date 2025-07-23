const helpers = require('../../helpers');
const constants = require('../../constants');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();
	responseBody.result = {};

	try {
		const izinler = await repositories.izin.list();
		responseBody.result.data = izinler;
		return res.status(responseBody.httpStatus).json(responseBody);
	} catch (error) {
		responseBody = helpers.error.catcher(error);
		return res.status(responseBody.httpStatus).json(responseBody);
	}
};
