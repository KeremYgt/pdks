const helpers = require('../../helpers');
const constants = require('../../constants');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();
	responseBody.result = {};

	try {
		const newIzin = {
			user_id: req.body.user_id,
			izin_baslangic_tarihi: new Date(req.body.izin_baslangic_tarihi),
			izin_bitis_tarihi: new Date(req.body.izin_bitis_tarihi),
			aciklama: req.body.aciklama || '',
			created_at: new Date(),
		};
		const query = await repositories.izin.create(newIzin);

		responseBody.result.data = query;
		return res.status(responseBody.httpStatus).json(responseBody);
	} catch (error) {
		responseBody = helpers.error.catcher(error);
		return res.status(responseBody.httpStatus).json(responseBody);
	}
};
