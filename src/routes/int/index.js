const express = require('express');
const router = express.Router();
const services = require('../../services');
const middlewares = require('../../middlewares');

/**
 * GET /int/health-check
 * @summary api health check endpoint
 * @tags INT
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - Server error - application/json
 */
router.get('/health-check', [], services.int.healthCheck);

module.exports = router;
