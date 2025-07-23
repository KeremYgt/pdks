const constants = require('../../constants');
const helpers = require('../../helpers');
const izinUpdateService = require('../../services/izinler/update');

module.exports.create = async (req, res, next) => {
	try {
		const { user_id, izin_baslangic_tarihi, izin_bitis_tarihi, aciklama } = req.body;

		if (!user_id || !izin_baslangic_tarihi || !izin_bitis_tarihi) {
			throw new Error('Tüm alanlar zorunludur.');
		}
		return next();
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, message: err.message || 'İzin eklenemedi.' });
	}
};
module.exports.delete = async (req, res, next) => {
	try {
		const { _id, user_id } = req.body;
		if (!user_id) {
			throw new Error('User id girilmelidir.');
		}
		if (!_id) {
			throw new Error("Silinecek izin ID'si (params._id) belirtilmelidir.");
		}
		return next();
	} catch (err) {
		console.error(err);
		res.status(400).json({ status: false, message: err.message || 'İzin silinemedi.' });
	}
};

const izinListService = require('../../services/izinler/list');

module.exports.list = async (req, res, next) => {
	return izinListService(req, res);
};

module.exports.update = async (req, res, next) => {
	try {
		const { _id, user_id, izin_baslangic_tarihi, izin_bitis_tarihi } = req.body;

		if (!user_id) {
			throw new Error('User ID girilmelidir.');
		}

		if (!_id) {
			throw new Error("Güncellenecek izin ID'si (_id) belirtilmelidir.");
		}

		if (!izin_baslangic_tarihi || !izin_bitis_tarihi) {
			throw new Error('İzin başlangıç ve bitiş tarihleri girilmelidir.');
		}

		return next();
	} catch (err) {
		console.error(err);
		res.status(400).json({ status: false, message: err.message || 'İzin güncellenemedi.' });
	}
};
