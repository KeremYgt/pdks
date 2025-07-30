const express = require('express');
const router = express.Router();
const controller = require('../../controller');
const services = require('../../services');
const middlewares = require('../../middlewares');

router.post('/check', [middlewares.authorization, controller.terminal.izinVer], services.terminal.checkAccess);
router.post('/create', [middlewares.authorization, controller.terminal.izinVer], services.terminal.addIzin);
router.delete('/delete', [middlewares.authorization, controller.terminal.izinVer], services.terminal.removeIzin);
router.post('/create', [middlewares.authorization, controller.terminal.kontrolEt], services.terminal.addTerminal);
router.put('/update', [middlewares.authorization, controller.terminal.kontrolEt], services.terminal.updateTerminal);
router.delete('/delete', [middlewares.authorization, controller.terminal.kontrolEt], services.terminal.deleteTerminal);
router.post('/list', [middlewares.authorization], services.terminal.listTerminal);
router.post('/list', [middlewares.authorization], services.terminal.listIzin);

module.exports = router;
