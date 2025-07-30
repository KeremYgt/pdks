const db = require('../../db');
const { listIzin, listTerminal } = require('../../services/terminal');

module.exports = {
	addTerminal: async (terminal) => {
		return await new db.MongoDB.CRUD('pdks', 'terminal').insert(terminal);
	},

	updateTerminal: async (terminal_id, updateData) => {
		return await new db.MongoDB.CRUD('pdks', 'terminal').update({ terminal_id }, { $set: updateData });
	},

	deleteTerminal: async (terminal_id) => {
		return await new db.MongoDB.CRUD('pdks', 'terminal').deleteOne({ terminal_id });
	},

	addIzin: async (terminal_id, user_id) => {
		return await new db.MongoDB.CRUD('pdks', 'terminalizin').insert({ terminal_id, user_id });
	},

	removeIzin: async (terminal_id, user_id) => {
		return await new db.MongoDB.CRUD('pdks', 'terminalizin').deleteOne({ terminal_id, user_id });
	},

	checkIzin: async (terminal_id, user_id) => {
		return await new db.MongoDB.CRUD('pdks', 'terminalizin').find({ terminal_id, user_id });
	},
	listIzin: async () => {
		return await new db.MongoDB.CRUD('pdks', 'terminalizin').find({}, [0, 0]);
	},
	listTerminal: async () => {
		return await new db.MongoDB.CRUD('pdks', 'terminal').find({}, [0, 0]);
	},
};
