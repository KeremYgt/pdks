const express = require('express');
const router = express.Router();
const services = require('../../services');
const middlewares = require('../../middlewares');
const controller = require('../../controller');
const fileupload = require('express-fileupload');

/**
 * uploadCreate defination
 * @typedef {object} UploadCreate
 * @property {string} file.required - files - binary
 * @property {string} type.required - IMAGE or PDF
 */

/**
 * POST /upload/create
 * @summary upload create
 * @security HeaderAuth
 * @security HeaderAgencyID
 * @tags UPLOAD
 * @param {UploadCreate} request.body.required - upload create - multipart/form-data
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Bad request response - application/json
 */
router.post(
	'/create',
	[middlewares.authorization, fileupload({ limits: { fileSize: 50 * 1024 * 1024 } }), controller.upload.create],
	services.upload.create,
);

/**
 * UploadList defination
 * @typedef {object} UploadList
 * @property {string} type.required - IMAGE or PDF
 * @property {number} skip - skip
 * @property {number} limit - limit
 */

/**
 * POST /upload/list
 * @summary upload list
 * @security HeaderAuth
 * @security HeaderAgencyID
 * @tags UPLOAD
 * @param {UploadList} request.body.required - upload list
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Bad request response - application/json
 */
router.post('/list', [middlewares.authorization, controller.upload.list], services.upload.list);

module.exports = router;
