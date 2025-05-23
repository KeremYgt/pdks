const helpers = require('../../helpers');
const db = require('../../db');

module.exports.list = async (user_id, type, skip = 0, limit = 10) => {
	const agg = [];
	const match = {
		user_id,
		type,
	};
	if (skip > 0) {
		agg.push({ $skip: skip });
	}
	if (limit > 10) {
		agg.push({ $limit: limit });
	}
	const data = await new db.MongoDB.CRUD('db_name', 'user_uploads').aggregate([
		{ $match: match },
		{
			$facet: {
				data: agg,
				stats: [{ $count: 'total' }],
			},
		},
		{
			$unwind: {
				path: '$stats',
				preserveNullAndEmptyArrays: true,
			},
		},
	]);
	if (data.length > 0) {
		return helpers.response.facetFixer(data[0]);
	}
	return data;
};
