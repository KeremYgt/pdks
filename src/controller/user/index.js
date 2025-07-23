const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports.login = async (req, res, next) => {
	try {
		if (!req.body.email || !req.body.password) {
			throw new constants.errors.MissingField('controller.user.login', 'email, password missing or invalid!');
		}

		if (helpers.form.isEmailValid(req.body.email) === false) {
			throw new constants.errors.WrongParam('controller.user.login', 'email wrong!');
		}
		req.body.email = req.body.email.toString();
		req.body.password = req.body.password.toString();
		return next();
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};

module.exports.register = (req, res, next) => {
	try {
		const body = {
			email: null,
			password: null,
		};
		if (!req.body.email || !req.body.password || req.body.email.length < 3 || req.body.password.length < 3) {
			throw new constants.errors.MissingField('controller.user.register', 'email, password missing!');
		}

		if (helpers.form.isEmailValid(req.body.email) === false) {
			throw new constants.errors.WrongParam('controller.user.register', 'email wrong!');
		}

		body.email = req.body.email.toString().toLowerCase();
		body.password = req.body.password.toString();

		req.body = body;

		return next();
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};

module.exports.delete = async (req, res, next) => {
	try {
		const { user_id, name, surname } = req.body;

		if (!user_id || !name || !surname) {
			throw new Error('Silinecek kullanıcı için user id, ad ve soyad zorunludur.');
		}

		return next();
	} catch (err) {
		console.error(err);
		res.status(400).json({ status: false, message: err.message || 'Kullanıcı silinemedi.' });
	}
};

module.exports.list = async (req, res, next) => {
	try {
		// Burada herhangi bir kontrol gerekmediği için doğrudan next()
		return next();
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: false, message: 'Listeleme işlemi sırasında bir hata oluştu.' });
	}
};
