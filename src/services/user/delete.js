const { CRUD } = require('../../db/MongoDB');

module.exports = async (req, res) => {
	try {
		const { user_id, name, surname } = req.body;

		// Kullanıcıyı sil
		const result = await new CRUD('pdks', 'users').deleteOne({
			user_id,
			name,
			surname,
		});

		if (!result || result.deletedCount === 0) {
			return res.status(404).json({
				status: false,
				message: 'Kullanıcı bulunamadı veya bilgiler eşleşmiyor.',
			});
		}

		return res.status(200).json({
			status: true,
			message: 'Kullanıcı başarıyla silindi.',
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			status: false,
			message: err.message || 'Kullanıcı silinirken bir hata oluştu.',
		});
	}
};
