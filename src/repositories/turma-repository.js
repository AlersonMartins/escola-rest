'use strict'

const mongoose = require('mongoose');
const Turma = mongoose.model('Turma');

exports.get = async() => {
    return await Turma.aggregate([
        {
            $lookup: {
                from: 'Disciplinas',
                as: 'disciplina',
                localField: 'disciplina',
                foreignField: '_id'
            }
        }, 
        {
            $project: {
                "_id": true,
                "title": true,
                "createdAt": true,
                "updatedAt": true,
                "disciplina": { "title": true }
            }
        }
    ]);
}

exports.getById = async(id) => {
    return await Turma.aggregate([
        {
            $match: {
                _id: id,
            }
        },
        {
            $lookup: {
                from: 'Disciplinas',
                as: 'disciplina',
                localField: 'disciplina',
                foreignField: '_id'
            }
        }, 
        {
            $project: {
                "_id": true,
                "title": true,
                "createdAt": true,
                "updatedAt": true,
                "disciplina": { "title": true }
            }
        }
    ]);
}

exports.getByDiscId = async(id) => {
    return await Turma.findOne({
        disciplina: id
    });
}

exports.getByTitle = async(title) => {
    return await Turma.findOne({
        title: title
    });
}

exports.get = async() => {
    return await Turma.find();
}

exports.getByCodigo = async(codigo) => {
    return await Turma.findOne({
        codigo
    });
}

exports.create = async(data) => {
    return await Turma.create(data);
}

exports.edit = async(id, data, turma) => {
    return await Turma.findByIdAndUpdate(id, {
        $set: {
            ano: data.ano ? data.ano : turma.ano,
            semestre: data.semestre ? data.semestre : turma.semestre,
            disciplina: data.disciplina ? data.disciplina : turma.disciplina
        }
    })
}

exports.delete = async(codigo) => {
    return await Turma.findOneAndDelete(codigo);
}