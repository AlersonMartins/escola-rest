'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        name: 'escola-rest',
        type: 'Application/json',
        language: 'NodeJS',
        db: 'MongoDB',
        version: '3.0',
        description: 'APIRest criada com o objetivo de tirar 10 no trabalho da disciplina Tópicos de Programação',
    });
});

module.exports = router;