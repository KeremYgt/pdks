const express = require('express');
const router = express.Router();
const terminalController = require('../../controller/terminal/index');

router.post('/kontrol', terminalController.kontrolEt);

module.exports = router;
