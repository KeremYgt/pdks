module.exports.connection = {
	minPoolSize: {
		reader: 10,
		writer: 50,
	},
	maxPoolSize: {
		reader: 30,
		writer: 100,
	},
	connectTimeoutMS: 20 * 100000,
};

module.exports.generalDbs = ['pdks'];

module.exports.idAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
