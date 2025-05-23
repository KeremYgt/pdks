const constants = require('../../constants');
const repositories = require('../../repositories');
const helpers = require('../../helpers');
const db = require('../../db');

// eslint-disable-next-line no-undef
module.exports.capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) => first.toLocaleUpperCase(locale) + rest.join('');

/**
 * regex word changer mongodb de regex ile search ederken aradığınız
 * kelimeye göre daha doğru sonuçlar bulmanıza yardımcı olacak kelimize uygun regex kodu üretir.
 * @param {string} word
 * @param {string} language
 * @returns {string}
 */
module.exports.regexWordChangerForSearch = (word, language = 'tr') => {
	if (word) {
		const wordd = `${word}`;
		wordd.trim();
		const result = [];
		result.push(wordd);
		result.push(this.capitalizeFirstLetter(wordd, language));
		result.push(wordd.toLocaleUpperCase(language));
		result.push(wordd.toLocaleLowerCase(language));
		return result.join('|');
	}
	return word;
};
/**
 *
 * @param {object} oldObject
 * @param {object} newObject
 */
module.exports.objectDiff = (oldObject, newObject) => {
	const newObj = {};
	const oldObj = {};
	const pass = ['created_at', 'updated_at'];
	for (const property in newObject) {
		if (pass.includes(property)) {
			continue;
		}
		if (oldObject[property]) {
			if (newObject[property] !== oldObject[property]) {
				newObj[property] = newObject[property];
				oldObj[property] = oldObject[property];
			}
		} else {
			oldObj[property] = null;
			newObj[property] = newObject[property];
		}
	}
	return { newObj, oldObj };
};

/**
 * string example
 * 'device_id=4627-2714-9906-9050'
 *
 * @param {string} str
 * @returns {object}
 */
module.exports.stringToObject = (str) => {
	const obj = str.split(';').reduce((acc, current) => {
		const [key, value] = current.split('=');
		acc[key.trim()] = value.trim();
		return acc;
	}, {});
	return obj;
};

module.exports.getMinMax = (arr) => {
	if (!arr || Array.isArray(arr) === false || arr.length < 1) {
		throw new constants.errors.ServerError('helpers.general.getMinMax', 'arr is not array!');
	}
	let minV = arr[0];
	let maxV = arr[0];
	for (const a of arr) {
		if (a < minV) minV = a;
		if (a > maxV) maxV = a;
	}
	return [minV, maxV];
};

module.exports.getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.deepMerge = (obj1, obj2) => {
	const object1 = JSON.parse(JSON.stringify(obj1));
	const object2 = JSON.parse(JSON.stringify(obj2));
	for (const key in object2) {
		if (Object.hasOwn(object2, key)) {
			if (object2[key] instanceof Object && object1[key] instanceof Object) {
				object1[key] = this.deepMerge(object1[key], object2[key]);
			} else {
				object1[key] = object2[key];
			}
		}
	}
	return object1;
};

/**
 * deep equal for objects
 *
 * @param {object} obj1
 * @param {object} obj2
 * @returns {boolean}
 */
module.exports.deepEqual = (obj1, obj2) => {
	// Eğer iki obje aynıysa, eşit kabul edebiliriz
	if (obj1 === obj2) {
		return true;
	}

	// Eğer objelerden biri null ya da obje değilse, eşit değildir
	if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
		return false;
	}

	// Obje anahtarlarını alalım
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	// Anahtar sayısı aynı değilse, objeler farklıdır
	if (keys1.length !== keys2.length) {
		return false;
	}

	// Tüm anahtarları karşılaştır
	for (const key of keys1) {
		// Aynı anahtarların değerleri aynı değilse, objeler farklıdır
		if (!this.deepEqual(obj1[key], obj2[key])) {
			return false;
		}
	}

	return true;
};

module.exports.digitsAfterComma = (number, digits = 0) => {
	if (typeof number === 'number' && typeof number === 'number' && typeof digits === 'number') {
		return Math.trunc(number * 10 ** digits) / 10 ** digits;
	}
	throw new constants.errors.ServerError('helpers.general.digitsAfterComma', `${typeof number} ${typeof digits}`);
};

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
module.exports.sleeper = sleep;
