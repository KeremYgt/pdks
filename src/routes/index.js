const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
	req.headers.ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
	next();
});

const int = require('./int');
const upload = require('./upload');
const user = require('./user');

router.use('/int', int);
router.use('/upload', upload);
router.use('/user', user);

module.exports = router;
