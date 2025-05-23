module.exports.DEFAULT = () => {
	return {
		status: true,
		errorCode: null,
		operation: null,
		httpStatus: 200,
		desc: '',
		result: {},
	};
};

module.exports.MISSING_FIELD = () => {
	return {
		status: false,
		desc: 'Missing Paramter(s)!',
		operation: null,
		errorCode: 1,
		httpStatus: 406,
		result: {},
	};
};

module.exports.UNAUTH = () => {
	return {
		status: false,
		desc: 'Unauthenticated Request !',
		operation: null,
		errorCode: 2,
		httpStatus: 401,
		result: {},
	};
};

module.exports.SERVER_ERROR = () => {
	return {
		status: false,
		desc: 'Server Error !',
		operation: null,
		errorCode: 3,
		httpStatus: 500,
		result: {},
	};
};

module.exports.FORBIDDEN = () => {
	return {
		status: false,
		desc: 'Forbidden Request !',
		errorCode: 4,
		httpStatus: 403,
		result: {},
	};
};

module.exports.NOT_FOUND = () => {
	return {
		status: false,
		desc: 'Not Found !',
		operation: null,
		errorCode: 5,
		httpStatus: 404,
		result: {},
	};
};

module.exports.WRONG_PARAM = () => {
	return {
		status: false,
		desc: 'Wrong Parameter (s)!',
		operation: null,
		errorCode: 6,
		httpStatus: 422,
		result: {},
	};
};

module.exports.CONFLICT = () => {
	return {
		status: false,
		desc: 'Duplicate Data !',
		operation: null,
		errorCode: 7,
		httpStatus: 409,
		result: {},
	};
};

module.exports.BAD_REQUEST = () => {
	return {
		status: false,
		desc: 'Bad Request!',
		operation: null,
		errorCode: 8,
		httpStatus: 400,
		result: {},
	};
};

module.exports.GTFS_WRONG_PARAM = () => {
	return {
		status: false,
		desc: 'GTFS Wrong Parameter (s)!',
		operation: null,
		errorCode: 9,
		httpStatus: 422,
		result: {},
	};
};

module.exports.CONFIG = {
	maxResultInArray: 60,
};
