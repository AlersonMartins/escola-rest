'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/turma-controller')

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/codigo/:codigo', controller.getByCodigo);
router.post('/', controller.post);
router.put('/:codigo', controller.put);
router.delete('/:codigo', controller.delete);

module.exports = router;