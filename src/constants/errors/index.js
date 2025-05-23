function paramsAdder(thiss, params) {
	if (params.length === 0) {
		return thiss;
	}
	for (const key in params[0]) {
		thiss[key] = params[0][key];
	}
	return thiss;
}

class NotFound extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NotFound);
		}
		this.name = 'NotFound';
		this.operation = `${operation}`;
		this.errorCode = 5;
		this.httpStatus = 404;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class ServerError extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ServerError);
		}
		this.name = 'ServerError';
		this.operation = `${operation}`;
		this.errorCode = 3;
		this.httpStatus = 500;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class MissingField extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, MissingField);
		}
		this.name = 'MissingField';
		this.operation = `${operation}`;
		this.httpStatus = 406;
		this.errorCode = 1;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class UnAuth extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UnAuth);
		}
		this.name = 'UnAuth';
		this.operation = `${operation}`;
		this.errorCode = 2;
		this.message = `${message}`;
		this.httpStatus = 401;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class Forbidden extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Forbidden);
		}
		this.name = 'Forbidden';
		this.operation = `${operation}`;
		this.errorCode = 4;
		this.httpStatus = 403;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class WrongParam extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, WrongParam);
		}
		this.name = 'WrongParam';
		this.operation = `${operation}`;
		this.errorCode = 6;
		this.httpStatus = 422;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class Conflict extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Conflict);
		}
		this.name = 'Conflict';
		this.operation = `${operation}`;
		this.errorCode = 7;
		this.httpStatus = 409;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class BadRequest extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BadRequest);
		}
		this.name = 'BadRequest';
		this.operation = `${operation}`;
		this.errorCode = 8;
		this.httpStatus = 400;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class GtfsWrongParam extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, GtfsWrongParam);
		}
		this.name = 'GtfsWrongParam';
		this.operation = `${operation}`;
		this.httpStatus = 400;
		this.errorCode = 9;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class DbError extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, DbError);
		}
		this.name = 'DbError';
		this.operation = `${operation}`;
		this.httpStatus = 500;
		this.errorCode = 10;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class RepositoryError extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RepositoryError);
		}
		this.name = 'RepositoryError';
		this.operation = `${operation}`;
		this.httpStatus = 500;
		this.errorCode = 11;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class DateRangeProblem extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, DateRangeProblem);
		}
		this.name = 'DateRangeProblem';
		this.operation = `${operation}`;
		this.httpStatus = 500;
		this.errorCode = 12;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class Frontend extends Error {
	constructor(operation = '', vendor = '', stack = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Frontend);
		}
		this.name = 'Frontend';
		this.operation = `${operation}`;
		this.vendor = `${vendor}`;
		this.stack = `${stack}`;
		this.errorCode = 14;
		this.httpStatus = 500;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class ValidationError extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ValidationError);
		}
		this.name = 'ValidationError';
		this.operation = `${operation}`;
		this.errorCode = 6;
		this.httpStatus = 422;
		this.message = `Validation Errors: ${JSON.stringify(message)}`;
		this.result = message;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class MaintenanceMode extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ValidationError);
		}
		this.name = 'MaintenanceMode';
		this.operation = `${operation}`;
		this.errorCode = 15;
		this.httpStatus = 500;
		this.message = `${message}`;
		this.result = message;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class PastDateOperate extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, PastDateOperate);
		}
		this.name = 'PastDateOperate';
		this.operation = `${operation}`;
		this.errorCode = 16;
		this.httpStatus = 422;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}
class QueLocked extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, QueLocked);
		}
		this.name = 'QueLocked';
		this.operation = `${operation}`;
		this.errorCode = 17;
		this.httpStatus = 409;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

class CaptchaWrong extends Error {
	constructor(operation = '', message = '', ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CaptchaWrong);
		}
		this.name = 'CaptchaWrong';
		this.operation = `${operation}`;
		this.errorCode = 18;
		this.httpStatus = 422;
		this.message = `${message}`;
		this.date = new Date();
		paramsAdder(this, params);
	}
}

module.exports = {
	NotFound,
	ServerError,
	MissingField,
	UnAuth,
	Forbidden,
	WrongParam,
	Conflict,
	BadRequest,
	GtfsWrongParam,
	DbError,
	RepositoryError,
	DateRangeProblem,
	Frontend,
	ValidationError,
	MaintenanceMode,
	PastDateOperate,
	QueLocked,
	CaptchaWrong,
};
