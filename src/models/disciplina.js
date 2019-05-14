'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { 
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'Disciplinas'
});

module.exports = mongoose.model('Disciplina', schema);