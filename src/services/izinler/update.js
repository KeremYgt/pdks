const repositories = require('../../repositories');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
	try {
		const { _id, izin_baslangic_tarihi, izin_bitis_tarihi, aciklama } = req.body;

		const updateData = {
			izin_baslangic_tarihi: new Date(izin_baslangic_tarihi),
			izin_bitis_tarihi: new Date(izin_bitis_tarihi),
		};

		if (aciklama) {
			updateData.aciklama = aciklama;
		}

		const result = await repositories.izin.update({ _id: ObjectId.createFromHexString(_id) }, { $set: updateData });

		if (result.modifiedCount === 0) {
			return res.status(404).json({ status: false, message: 'İzin güncellenemedi veya zaten aynı.' });
		}

		return res.status(200).json({ status: true, message: 'İzin başarıyla güncellendi.' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, message: err.message || 'Güncelleme sırasında bir hata oluştu.' });
	}
};
