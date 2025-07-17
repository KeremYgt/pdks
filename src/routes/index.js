const express = require('express');
const router = express.Router();

const int = require('./int');
const user = require('./user');

router.use('/int', int);
router.use('/user', user);

module.exports = router;
