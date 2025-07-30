const terminalRepo = require('../../repositories/terminal');

module.exports = {
	//Terminal Ekleme
	addTerminal: async (req, res) => {
		try {
			const { terminal_id, office_id, project_id } = req.body;
			if (!terminal_id || !office_id || !project_id) {
				return res.status(400).json({ status: false, message: 'Zorunlu alanlar eksik' });
			}

			await terminalRepo.addTerminal({ terminal_id, office_id, project_id });
			return res.status(201).json({ status: true, message: 'Terminal eklendi' });
		} catch (err) {
			return res.status(500).json({ status: false, message: err.message });
		}
	},

	//Terminal listeleme
	listTerminal: async (req, res) => {
		try {
			const users = await terminalRepo.listTerminal.list();
			res.json({
				status: true,
				message: 'Terminaller başarıyla listelendi.',
				data: users,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({
				status: false,
				message: 'Terminaller listelenemedi.',
			});
		}
	},
	//Terminal güncelleme
	updateTerminal: async (req, res) => {
		try {
			const { terminal_id, office_id, project_id } = req.body;
			if (!terminal_id) {
				return res.status(400).json({ status: false, message: 'Terminal ID gerekli' });
			}

			await terminalRepo.updateTerminal(terminal_id, { office_id, project_id });
			return res.status(200).json({ status: true, message: 'Güncellendi' });
		} catch (err) {
			return res.status(500).json({ status: false, message: err.message });
		}
	},
	// Terminal silme
	deleteTerminal: async (req, res) => {
		try {
			const { terminal_id } = req.body;
			if (!terminal_id) {
				return res.status(400).json({ status: false, message: 'Terminal ID gerekli' });
			}

			await terminalRepo.deleteTerminal(terminal_id);
			return res.status(200).json({ status: true, message: 'Silindi' });
		} catch (err) {
			return res.status(500).json({ status: false, message: err.message });
		}
	},

	// Terminal izin kontrolü
	checkAccess: async (req, res) => {
		try {
			const { terminal_id, user_id } = req.body;
			if (!terminal_id || !user_id) {
				return res.status(400).json({ status: false, message: 'ID alanları eksik' });
			}

			const izin = await terminalRepo.checkIzin(terminal_id, user_id);
			if (izin) {
				return res.status(200).json({ status: true, message: 'Erişim izni var' });
			}
			return res.status(403).json({ status: false, message: 'Erişim izni yok' });
		} catch (err) {
			return res.status(500).json({ status: false, message: err.message });
		}
	},

	// İzin ekle
	addIzin: async (req, res) => {
		try {
			const { terminal_id, user_id } = req.body;
			await terminalRepo.addIzin(terminal_id, user_id);
			return res.status(200).json({ status: true, message: 'İzin eklendi' });
		} catch (err) {
			return res.status(500).json({ status: false, message: err.message });
		}
	},

	// İzin sil
	removeIzin: async (req, res) => {
		try {
			const { terminal_id, user_id } = req.body;
			await terminalRepo.removeIzin(terminal_id, user_id);
			return res.status(200).json({ status: true, message: 'İzin kaldırıldı' });
		} catch (err) {
			return res.status(500).json({ status: false, message: err.message });
		}
	},
	//Bütün terminal izinleri listeleme
	listIzin: async (req, res) => {
		try {
			const users = await terminalRepo.listIzin.list();
			res.json({
				status: true,
				message: 'Terminal izinleri başarıyla listelendi.',
				data: users,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({
				status: false,
				message: 'Terminal izinleri listelenemedi.',
			});
		}
	},
};
