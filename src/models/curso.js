'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { 
        type: String,
        required: true,
        trim: true
    },
    alunos : [{
        type: String,
        required: false,
        trim: true
    }],
    disciplinas : [{
        type: String,
        required: false,
        trim: true
    }]
}, {
    timestamps: true,
    collection: 'Cursos'
});

module.exports = mongoose.model('Curso', schema);