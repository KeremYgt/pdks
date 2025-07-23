const db = require('../../db');
const { ObjectId } = require('mongodb');
const { update } = require('../../services/izinler');

module.exports = {
	create: async (data) => {
		return await new db.MongoDB.CRUD('pdks', 'izinler').insert(data);
	},

	delete: async (query) => {
		return await new db.MongoDB.CRUD('pdks', 'izinler').delete(query);
	},

	list: async () => {
		return await new db.MongoDB.CRUD('pdks', 'izinler').find({}, [0, 100]);
	},

	update: async (izinId, updateData) => {
		return await new db.MongoDB.CRUD('pdks', 'izinler').update(izinId, updateData);
	},
};
