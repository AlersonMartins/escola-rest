'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno-controller')

router.get('/', controller.get);
router.get('/:matricula', controller.getByMatricula);
router.post('/', controller.post);
router.put('/:matricula', controller.put);
router.delete('/:matricula', controller.delete);

module.exports = router;