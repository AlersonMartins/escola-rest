'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    codigo: {
        type: String,
        required: true,
        trim: true
    },
    ano: { 
        type: Number,
        required: true,
        trim: true
    },
    semestre : {
        type: Number,
        required: true,
        trim: true
    },
    disciplina : {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'Turmas'
});

module.exports = mongoose.model('Turma', schema);