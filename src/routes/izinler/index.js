const express = require('express');
const router = express.Router();
const controller = require('../../controller');
const services = require('../../services');
const middlewares = require('../../middlewares');

router.post('/create', [middlewares.authorization, controller.izin.create], services.izin.create);
router.post('/list', [middlewares.authorization, controller.izin.list], services.izin.list);
router.delete('/delete', [middlewares.authorization, controller.izin.delete], services.izin.delete);
router.put('/update', [middlewares.authorization, controller.izin.update], services.izin.update);

module.exports = router;
