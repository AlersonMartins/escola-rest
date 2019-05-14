'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/inscricao-controller')

router.get('/', controller.get);
router.get('/codigoTurma/:codigoTurma', controller.getByCodigoTurma);
router.get('/matricula/:matricula', controller.getByMatriculaAluno);
router.post('/', controller.post);
router.put('/:matriculaAluno/:codigoTurma', controller.put);
router.delete('/:matriculaAluno/:codigoTurma', controller.delete);

module.exports = router;