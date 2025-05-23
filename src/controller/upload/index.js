const constants = require('../../constants');
const helpers = require('../../helpers');

module.exports.create = (req, res, next) => {
	try {
		const body = {};
		if (!req.body.type) {
			throw new constants.errors.MissingField('controller.upload.create', 'type missing!');
		}

		if (req.body.type in constants.upload.types === false) {
			throw new constants.errors.WrongParam('controller.upload.create', 'type wrong!');
		}

		body.type = req.body.type.toString();

		if (req.files === null || typeof req.files !== 'object' || typeof req.files.file === 'undefined' || req.files.file === null) {
			throw new constants.errors.MissingField('controller.upload.create', 'file(s) missing!');
		}

		let allowedMimeTypes = constants.upload.photoAllowedMimeTypes;

		if (req.body.type === constants.upload.types.PDF) {
			allowedMimeTypes = constants.upload.pdfAllowedMimeTypes;
		}

		if (typeof req.files.file.data === 'undefined' || allowedMimeTypes.includes(req.files.file.mimetype) === false) {
			throw new constants.errors.WrongParam('controller.upload.create', 'file(s) wrong mimetype!');
		}
		req.body = body;
		return next();
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};

module.exports.list = (req, res, next) => {
	try {
		const body = {
			skip: 0,
			limit: 10,
		};
		if (req.body.type in constants.upload.types === false) {
			throw new constants.errors.WrongParam('controller.upload.list', 'type wrong!');
		}
		body.type = req.body.type.toString();
		if (req.body.skip >= 0) {
			body.skip = parseInt(req.body.skip, 10);
		}
		if (req.body.limit >= 0) {
			body.limit = parseInt(req.body.limit, 10);
		}

		req.body = body;
		return next();
	} catch (error) {
		const response = helpers.error.catcher(error);
		return res.status(response.httpStatus).json(response);
	}
};
