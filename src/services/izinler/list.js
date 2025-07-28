const helpers = require('../../helpers');
const constants = require('../../constants');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();

	try {
		const izinler = await repositories.izin.list();
		responseBody.result.data = izinler;
	} catch (error) {
		responseBody = helpers.error.catcher(error);
	}
	return res.status(responseBody.httpStatus).json(responseBody);
};
