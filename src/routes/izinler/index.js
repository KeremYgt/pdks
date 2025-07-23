const express = require('express');
const router = express.Router();
const controller = require('../../controller');
const services = require('../../services');

router.post('/create', [controller.izin.create], services.izin.create);
router.post('/list', [controller.izin.list], services.izin.list);
router.delete('/delete', [controller.izin.delete], services.izin.delete);
router.put('/update', [controller.izin.update], services.izin.update);

module.exports = router;
