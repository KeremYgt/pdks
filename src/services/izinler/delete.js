const helpers = require('../../helpers');
const constants = require('../../constants');
const repositories = require('../../repositories');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
	try {
		const _id = req.body._id;
		console.log(_id);
		const result = await repositories.izin.delete({ _id: ObjectId.createFromHexString(_id) });

		if (result.deletedCount === 0) {
			return res.status(404).json({ status: false, message: 'Belirtilen ID ile izin bulunamadı.' });
		}

		return res.status(200).json({ status: true, message: 'İzin başarıyla silindi.' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, message: err.message || 'Silme sırasında bir hata oluştu.' });
	}
};
