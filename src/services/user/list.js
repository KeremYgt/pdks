const repositories = require('../../repositories');

module.exports = async (req, res) => {
	try {
		const users = await repositories.user.list();

		res.json({
			status: true,
			message: 'Kullanıcılar başarıyla listelendi.',
			data: users,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: false,
			message: 'Kullanıcılar listelenemedi.',
		});
	}
};
