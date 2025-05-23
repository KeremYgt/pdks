const constants = require('../../constants');
const kk_date = require('kk-date');
module.exports.moment = require('./moment');
module.exports.kk_date = kk_date;
kk_date.caching({ status: true, defaultTtl: 1300 });

/**
 *
 * @param {string} date
 * @param {string} time
 * @param {string} date_time
 * @returns
 */
module.exports.date = (date = null, time = null, date_time = null) => {
	let datetime_string = '';
	if (date && time) {
		datetime_string = `${date} ${time}`;
	} else {
		datetime_string = date_time;
	}
	datetime_string = `${datetime_string}Z`;
	return new Date(datetime_string);
};

/**
 *
 * @param {string} time
 * @returns
 */
module.exports.parseMinutes = (time) => {
	const [hours, minutes] = time.split(':');
	return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

module.exports.checkNextDayTrip = (time, day_starts = '04:00:00') => {
	// Başlangıç ve bitiş saatleri
	const [daystart_saat, daystart_dakika, daystart_saniye] = day_starts.split(':').map(Number);
	const [time_saat, time_dakika, time_saniye] = time.split(':').map(Number);

	// 00:00:00
	const start = new Date();
	start.setDate(7);
	start.setHours(0);
	start.setMinutes(0);
	start.setSeconds(0);

	// day_start
	const end = new Date();
	end.setDate(7);
	end.setHours(daystart_saat);
	end.setMinutes(daystart_dakika);
	end.setSeconds(daystart_saniye);

	// time
	const now = new Date();
	now.setDate(7);
	now.setHours(time_saat);
	now.setMinutes(time_dakika);
	now.setSeconds(time_saniye);

	// time start ile end'ina rasında mı?
	if (now >= start && now < end) {
		return true;
	}
	return false;
};

/**
 *
 * @param {string} time
 */
module.exports.gtfsTimeConvert = (time, day_starts = '04:00:00') => {
	const saat_str = `${time}`;
	const [saat, dakika, saniye] = saat_str.split(':').map(Number);
	if (dakika > 59 || saniye > 59) {
		throw new constants.errors.ServerError('gtfsTimeConvert', `${time} invalid time !`);
	}
	const tarih_obj = new Date();
	tarih_obj.setHours(saat);
	tarih_obj.setMinutes(dakika);
	tarih_obj.setSeconds(saniye);
	const tarih = tarih_obj.toLocaleTimeString('en-GB', { hour12: false });
	// const tarih = tarih_obj.toLocaleTimeString('en-GB', { hour12: false });
	if (Number.isNaN(tarih_obj)) {
		throw new constants.errors.ServerError('gtfsTimeConvert', `${time} invalid date ! -> ${saat} ${dakika} ${saniye}`);
	}
	const next_day_trip = this.checkNextDayTrip(tarih, day_starts);
	return { time: tarih, next_day_trip };
};

/**
 * @description Tarihi native date ile formatlar.
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
const formatDate = (date, format) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	if (format === 'YYYY-MM-DD') {
		return `${year}-${month}-${day}`;
	}
	return date.toISOString();
};

/**
 * @description 2 tarih arasındaki günleri native date ile getirir.
 * @param {string} start
 * @param {string} end
 * @param {string} format
 * @returns {array}
 */
module.exports.nativeDateRanges = (start, end, format = 'YYYY-MM-DD') => {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const rangeDates = [];

	const diffTime = endDate - startDate;
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	rangeDates.push(formatDate(startDate, format));
	for (let index = 0; index < diffDays; index++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + index + 1);
		rangeDates.push(formatDate(date, format));
	}

	return rangeDates;
};

/**
 *
 * @param {string} date YYYY-MM-DD
 */
module.exports.getDateName = (date) => {
	return;
};
