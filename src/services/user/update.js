const repositories = require('../../repositories');
const constants = require('../../constants');
const { ObjectId } = require('mongodb');
const helpers = require('../../helpers');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();

	try {
		const { _id, name, surname, email, telefon, password, office_id, role, project_id } = req.body;

		const updateData = {};

		if (name) updateData.name = name;
		if (surname) updateData.surname = surname;
		if (email) updateData.email = email;
		if (telefon) updateData.telefon = telefon;
		if (password) updateData.password = password;
		if (office_id) updateData.office_id = office_id;
		if (role) updateData.role = role;
		if (project_id) updateData.project_id = project_id;

		if (!_id) {
			throw new Error("Güncellenecek kullanıcı ID'si (_id) belirtilmelidir.");
		}

		await repositories.user.update({ _id: ObjectId.createFromHexString(_id) }, { $set: updateData });

		responseBody.result = 'Kullanıcı güncellendi';
	} catch (err) {
		responseBody = helpers.error.catcher(err);
	}

	return res.status(responseBody.httpStatus).json(responseBody);
};
