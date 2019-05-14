'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    matricula: { 
        type: String,
        required: true,
        trim: true
    },
    nome: {
        type : String,
        required: true,
        trim: true
    },
    dataNascimento : {
        type: Date,
        required: true,
        trim: true
    },
    idade : {
        type: Number,
        required: true,
        trim: true
    }, 
    matriculaAtiva : {
        type: Boolean,
        required: true,
        trim: true
    },
    estadoCivil : {
        type: String,
        required: true,
        trim: true
    },
    telefones : [{
        type: Number,
        required: true,
        trim: true
    }],
    curso : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    },
}, {
    timestamps: true,
    collection: 'Alunos'
});

module.exports = mongoose.model('Aluno', schema);