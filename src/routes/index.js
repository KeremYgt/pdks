const express = require('express');
const router = express.Router();

const int = require('./int');
const user = require('./user');
const izinler = require('./izinler');
const terminal = require('./terminal');

router.use('/int', int);
router.use('/user', user);

router.use('/izinler', izinler);

module.exports = router;
