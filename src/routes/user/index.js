const express = require('express');
const router = express.Router();
const services = require('../../services');
const controller = require('../../controller');
const middlewares = require('../../middlewares');

/**
 * @typedef {object} Izin
 * @property {string} user_id.required - Kullanıcı ID'si
 * @property {string} izin_baslangic_tarihi.required - İzin başlangıç tarihi (YYYY-MM-DD)
 * @property {string} izin_bitis_tarihi.required - İzin bitiş tarihi (YYYY-MM-DD)
 */

/**
 * POST /izin
 * @summary Yeni izin oluştur
 * @tags IZIN
 * @param {Izin} request.body.required
 * @return {object} 200 - İzin başarıyla oluşturuldu
 */

/**
 * GET /izin
 * @summary Tüm izinleri getir
 * @tags IZIN
 * @return {array<Izin>} 200 - İzin listesi
 */

/**
 * user login defination
 * @typedef {object} UserLogin
 * @property {string} email - email
 * @property {string} password - password - json:{"minLength": 6}
 */

router.delete('/delete', [controller.user.delete], services.user.delete);
router.post('/list', [controller.user.list], services.user.list);

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
 *
 * @property {string} password.required - password - json:{"minLength": 8}
 *
 * @property {string} name.required - name
 *
 * @property {string} surname.required - surname
 *
 * @property {string} telefon.required - telefon
 *
 * @property {string} user_id.required - user_id
 *
 * @property {string} office_id.required - office_id
 *
 * @property {string} project_id.required - project_id
 *
 * @property {string} role.required - role
 *
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
router.post('/register', services.user.register);

module.exports = router;
