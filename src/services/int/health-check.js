const helpers = require('../../helpers');
const constants = require('../../constants');
const db = require('../../db');

module.exports = async (req, res) => {
	let responseBody = constants.RESPONSE.DEFAULT();
	responseBody.result = {
		mongo: false,
		redis: false,
		configs: {
			status: true,
			maintenance: false,
		},
	};
	responseBody.timestamp = new helpers.date.kk_date().format('X');
	responseBody.desc = `project backend service.(${process.env.NODE_ENV})`;

	try {
		const redis = await helpers.cache.redis.set('healt-check', '1');
		const mongo = await new db.MongoDB.CRUD('db_name', 'test').aggregate([
			{
				$replaceWith: {
					$setField: {
						field: 'number1',
						input: '$$ROOT',
						value: 1,
					},
				},
			},
			{
				$replaceWith: {
					$setField: {
						field: 'number2',
						input: '$$ROOT',
						value: 1,
					},
				},
			},
			{ $project: { total: { $add: ['$number1', '$number1'] } } },
		]);

		if (mongo) {
			responseBody.result.mongo = true;
		}

		const config = await new db.MongoDB.CRUD('db_name', 'configs').find({ name: 'configs' }, [0, 1]);
		if (config && config.length > 0) {
			responseBody.result.configs = config[0].configs;
		}

		if (redis) {
			responseBody.result.redis = true;
		}

		if (!redis || !mongo) {
			responseBody.status = false;
		}
	} catch (error) {
		responseBody = helpers.error.catcher(error);
	}
	return res.status(responseBody.httpStatus).json(responseBody);
};
