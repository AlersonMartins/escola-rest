'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;	

const schema = new Schema({
    avaliacao1: { 
        type: Number,
        required: false,
        trim: true
    },
    avaliacao2: { 
        type: Number,
        required: false,
        trim: true
    },
    media: { 
        type: Number,
        required: false,
        trim: true
    },
    numFaltas: { 
        type: Number,
        required: false,
        trim: true
    },
    situacao: { 
        type: String,
        required: true,
        trim: true
    },
    matriculaAluno: { 
        type: String,
        required: true,
        trim: true
    },
    codigoTurma: { 
        type: String,
        required: true,
        trim: true
    },
    ano: { 
        type: Number,
        required: true,
        trim: true
    },
    semestre: { 
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'Inscricoes'
});

module.exports = mongoose.model('Inscricao', schema);