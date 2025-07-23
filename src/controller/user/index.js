const constants = require('../../constants');
const helpers = require('../../helpers');

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





