const db = require('../../db');
const { listIzin } = require('../../repositories/terminal');

module.exports.kontrolEt = async (req, res) => {
	const { user_id, terminal_name } = req.body;

	if (!user_id || !terminal_name) {
		return res.status(400).json({ status: false, message: 'user_id ve terminal_name zorunludur.' });
	}

	try {
		const izinKaydi = await new db.MongoDB.CRUD('pdks', 'terminalizin').find({ user_id, terminal_name });

		if (izinKaydi.length > 0) {
			return res.json({ status: true, message: 'Girişe izin verildi.' });
		}
		return res.status(403).json({ status: false, message: 'Bu terminal için izniniz yok.' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: false, message: 'Sunucu hatası.' });
	}
};

module.exports.izinVer = async (req, res) => {
	const { user_id, terminal_name } = req.body;

	if (!user_id || !terminal_name) {
		return res.status(400).json({ status: false, message: 'user_id ve terminal_name zorunludur.' });
	}

	try {
		// Daha önce bu izin zaten verilmiş mi?
		const mevcut = await new db.MongoDB.CRUD('pdks', 'terminalizin').find({ user_id, terminal_name });

		if (mevcut.length > 0) {
			return res.status(409).json({ status: false, message: 'Bu kullanıcıya bu terminal için zaten izin verilmiş.' });
		}

		// Yeni izin kaydı oluştur
		await new db.MongoDB.CRUD('pdks', 'terminalizin').insert({ user_id, terminal_name });

		return res.json({ status: true, message: 'Terminal izni başarıyla verildi.' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ status: false, message: 'Sunucu hatası.' });
	}
};

module.exports.list = async (req, res, next) => {
	return listIzin(req, res);
};
