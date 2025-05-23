const express = require('express');
const router = express.Router();
const services = require('../../services');
const controller = require('../../controller');
const middlewares = require('../../middlewares');

/**
 * user login defination
 * @typedef {object} UserLogin
 * @property {string} email - email
 * @property {string} password - password - json:{"minLength": 6}
 */

/**
 * POST /user/login
 * @summary user login endpoint
 * @tags USER
 * @param {UserLogin} request.body.required - user login body
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - not found user - application/json
 * @return {object} 500 - server error - application/json
 */
router.post('/login', [controller.user.login], services.user.login);

/**
 * user register defination
 * @typedef {object} UserRegister
 * @property {string} email.required - email
 * @property {string} password.required - password - json:{"minLength": 8}
 */

/**
 * POST /user/register
 * @summary user register endpoint
 * @tags USER
 * @param {UserRegister} request.body.required - user register body
 * @return {object} 200 - success response - application/json
 * @return {object} 404 - not found user - application/json
 * @return {object} 500 - server error - application/json
 */
router.post('/register', [controller.user.register], services.user.register);

module.exports = router;