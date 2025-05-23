const csv = require('csvtojson/v2');
const AdmZip = require('adm-zip');
const path = require('node:path');
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const fs = require('fs');

/**
 *
 * @param {*} path
 * @param {*} file
 * @returns
 */
module.exports.csvLoadFileAsync = async (path, file) => {
	return await csv().fromFile(`${path}/${file}`);
};

/**
 *
 * @param {string} filePath
 * @param {string} outputDir
 * @returns {boolean}
 */
module.exports.extractArchive = (filePath, outputDir = null) => {
	const zip = new AdmZip(filePath);
	let output = `${path.parse(filePath).name}`;
	if (outputDir) {
		output = `${outputDir}`;
	}
	zip.extractAllTo(output);
	return true;
};

/**
 * file deleter
 *
 * @param {string} path path MUST BE finish with "/"
 * @param {string|array} files can be array or string
 * @returns {boolean}
 */
module.exports.deleteFiles = async (path, files) => {
	if (Array.isArray(files)) {
		for (let index = 0; index < files.length; index++) {
			fs.unlinkSync(`${path}${files[index]}`);
		}
	} else {
		fs.unlinkSync(`${path}${files}`);
	}
	return true;
};

/**
 * file folder
 *
 * @param {string} path path
 * @returns {boolean}
 */
module.exports.deleteFolder = async (path) => {
	fs.rmSync(path, { recursive: true, force: true });
	return true;
};
