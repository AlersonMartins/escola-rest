'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://mongoproject:mongo123456@ds151486.mlab.com:51486/mongoproject');

const Curso = require('./models/curso');
const Disicplina = require('./models/disciplina');
const Aluno = require('./models/aluno');
const Turma = require('./models/turma');
const Inscricao = require('./models/inscricao');

const index = require('./routes/index');
const cursoRoutes = require('./routes/curso');
const disciplinaRoutes = require('./routes/disciplina');
const alunoRoutes = require('./routes/aluno');
const turmaRoutes = require('./routes/turma');
const inscricaoRoutes = require('./routes/inscricao');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/curso', cursoRoutes);
app.use('/disciplina', disciplinaRoutes);
app.use('/aluno', alunoRoutes);
app.use('/turma', turmaRoutes);
app.use('/inscricao', inscricaoRoutes);

module.exports = app;