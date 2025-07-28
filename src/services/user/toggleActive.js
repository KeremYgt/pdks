const repositories = require('../../repositories');

module.exports.toggleActive = async (req, res) => {
	try {
		const { user_id } = req.body;

		// Kullanıcıyı bul
		const user = await repositories.user.findById(user_id);
		if (!user) {
			return res.status(404).json({
				status: false,
				message: 'Kullanıcı bulunamadı.',
			});
		}

		// Yeni durumu tersine çevir
		const newStatus = !user.is_active;

		// Güncelleme işlemi
		const updated = await repositories.user.updateActiveStatus(user_id, newStatus);

		if (!updated.modifiedCount) {
			return res.status(500).json({
				status: false,
				message: 'Aktiflik durumu güncellenemedi.',
			});
		}

		return res.status(200).json({
			status: true,
			message: `Kullanıcının aktiflik durumu '${newStatus ? 'aktif' : 'pasif'}' olarak güncellendi.`,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			status: false,
			message: err.message || 'Aktiflik durumu değiştirilirken bir hata oluştu.',
		});
	}
};
