'use strict'

const mongoose = require('mongoose');
const Aluno = mongoose.model('Aluno');

exports.get = async() => {
    return await Aluno.aggregate([
        {
            $lookup: {
                from: 'Cursos',
                as: 'curso',
                localField: 'curso',
                foreignField: '_id'
            }
        }, 
        {
            $project: {
                "_id": true,
                "title": true,
                "createdAt": true,
                "updatedAt": true,
                "curso": { "title": true }
            }
        }
    ]);
}

exports.getById = async(id) => {
    return await Aluno.aggregate([
        {
            $match: {
                _id: id,
            }
        },
        {
            $lookup: {
                from: 'Cursos',
                as: 'curso',
                localField: 'curso',
                foreignField: '_id'
            }
        }, 
        {
            $project: {
                "_id": true,
                "title": true,
                "createdAt": true,
                "updatedAt": true,
                "curso": { "title": true }
            }
        }
    ]);
}

exports.getByCourseId = async(id) => {
    return await Aluno.findOne({
        curso: id
    });
}

exports.getByTitle = async(title) => {
    return await Aluno.findOne({
        title: title
    });
}

exports.get = async() => {
    return await Aluno.find();
}

exports.getByMatricula = async(matricula) => {
    return await Aluno.findOne({
        matricula: matricula
    });
}

exports.create = async(data) => {
    return await Aluno.create(data);
}

exports.edit = async(matricula, data, aluno) => {
    return await Aluno.findOneAndUpdate({ matricula: matricula }, {
        $set: {
            nome: data.nome ? data.nome : aluno.nome,
            dataNascimento: data.dataNascimento ? data.dataNascimento : aluno.dataNascimento,
            idade : data.idade ? data.idade : aluno.idade,
            matriculaAtiva: (data.matriculaAtiva != null) ? data.matriculaAtiva : aluno.matriculaAtiva,
            estadoCivil: data.estadoCivil ? data.estadoCivil : aluno.estadoCivil,
        }
    })
}

exports.delete = async(matricula) => {
    return await Aluno.findByIdAndDelete(matricula);
}