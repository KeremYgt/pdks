const moment = require('moment-timezone');
const constants = require('./../../constants');

/**
 * get timestamp
 *
 * @returns {Number}
 */
module.exports.timestamp = () => {
	return parseInt(moment().locale('tr').format('X'), 10);
};

/**
 * get timestamp ms
 *
 * @returns {Number}
 */
module.exports.timestampMS = () => {
	return parseInt(moment().locale('tr').format('x'), 10);
};

module.exports.momentModule = moment;

/**
 * moment object
 *
 * @param  {...any} args
 * @returns
 */
module.exports.moment = (...args) => {
	return moment(...args).locale('en');
};

module.exports.isValid = (date, format = 'YYYYMMDD') => {
	return moment(date, format, true).isValid();
};

module.exports.timeCategory = (time, timeFormat = 'HH:mm:ss') => {
	let timee = time;
	if (typeof timee === 'string') {
		timee = this.moment(time, 'HH:mm:ss');
	}
	if (
		timee.isBetween(moment('00:00:00', timeFormat), moment('04:59:59', timeFormat)) ||
		timee.isSame(moment('00:00:00', timeFormat)) ||
		timee.isSame(moment('04:59:59', timeFormat))
	) {
		return constants.stopTimes.TIME_CATEGORIES.DAWN;
	}
	if (
		timee.isBetween(moment('05:00:00', timeFormat), moment('11:59:59', timeFormat)) ||
		timee.isSame(moment('05:00:00', timeFormat)) ||
		timee.isSame(moment('11:59:59', timeFormat))
	) {
		return constants.stopTimes.TIME_CATEGORIES.MORNING;
	}
	if (
		timee.isBetween(moment('12:00:00', timeFormat), moment('16:59:59', timeFormat)) ||
		timee.isSame(moment('12:00:00', timeFormat)) ||
		timee.isSame(moment('16:59:59', timeFormat))
	) {
		return constants.stopTimes.TIME_CATEGORIES.NOON;
	}
	if (
		timee.isBetween(moment('17:00:00', timeFormat), moment('23:59:59', timeFormat)) ||
		timee.isSame(moment('17:00:00', timeFormat)) ||
		timee.isSame(moment('23:59:59', timeFormat))
	) {
		return constants.stopTimes.TIME_CATEGORIES.NIGHT;
	}
};

module.exports.diff = (ends, starts, format = 'YYYY-MM-DD', unitOfTime = 'days') => {
	return parseInt(moment(ends).diff(moment(starts).format(format), unitOfTime), 10);
};

/**
 * get date ranges
 *
 * @param {string} start
 * @param {string} end
 * @param {string} fomat
 * @returns
 */
module.exports.dateRanges = (start, end, format = 'YYYY-MM-DD') => {
	const range = this.diff(end, start, format, 'days');
	const rangeDates = [];
	rangeDates.push(moment(start).format(format));
	for (let index = 0; index < range; index++) {
		const date = moment(start)
			.add({ days: index + 1 })
			.format(format);
		rangeDates.push(date);
	}
	return rangeDates;
};

/**
 * get date ranges filter with service_id
 *
 * @param {string} start
 * @param {string} end
 * @param {array<string>} service_id { "monday": "0", "tuesday": "0", "wednesday": "0" ... }
 * @param {string} format
 * @returns
 */
module.exports.dateRangesWithService = (start, end, service_id = {}, format = 'YYYY-MM-DD') => {
	const range = this.diff(end, start, format, 'days');
	const rangeDates = [];
	if (
		service_id[moment(start).format('dddd').toLowerCase()] &&
		(typeof service_id[moment(start).format('dddd').toLowerCase()] === 'object' ||
			parseInt(service_id[moment(start).format('dddd').toLowerCase()], 10) ||
			typeof service_id[moment(start).format('dddd').toLowerCase()] === 'boolean')
	) {
		rangeDates.push(moment(start).format(format));
	}
	for (let index = 0; index < range; index++) {
		const date = moment(start).add({ days: index + 1 });
		if (
			service_id[date.format('dddd').toLowerCase()] &&
			(typeof service_id[moment(start).format('dddd').toLowerCase()] === 'object' ||
				parseInt(service_id[date.format('dddd').toLowerCase()], 10) ||
				typeof service_id[moment(start).format('dddd').toLowerCase()] === 'boolean')
		) {
			rangeDates.push(date.format(format));
		}
	}
	return rangeDates;
};

/**
 * @description Bitiş tarihi başlangıç tarihinden önce mi kontrolü sağlar.
 * @param {string} date
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} format - default 'YYYY-MM-DD'
 * @returns {boolean}
 */
module.exports.isBefore = (startDate, endDate, format = 'YYYY-MM-DD') => {
	return moment(endDate).isBefore(moment(startDate).format(format));
};
