const express = require('express');
const router = express.Router();

const createIzin = require('./create');
const deleteIzin = require('./delete');
const updateIzin = require('./update');
const listIzin = require('./list');

// POST /izinler/create
router.post('/create', createIzin);

// DELETE /izinler/delete
router.delete('/delete', deleteIzin);

// PUT /izinler/update
router.put('/update', updateIzin);

// GET /izinler/list
router.get('/list', listIzin);

module.exports = router;
