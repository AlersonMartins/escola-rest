'use strict'

const mongoose = require('mongoose');
const Curso = mongoose.model('Curso');

exports.get = async() => {
    return await Curso.find();
}

exports.getById = async(id) => {
    return await Curso.findById(id);
}

exports.getByTitle = async(title) => {
    return await Curso.findOne({
        title: title
    });
}

exports.create = async(data) => {
    return await Curso.create(data);
}

exports.edit = async(id, data, curso) => {
    return await Curso.findByIdAndUpdate(id, {
        $set: {
            title: data.title ? data.title : curso.title,
            cursos: data.cursos ? data.cursos : curso.cursos,
            disciplinas: data.disciplinas ? data.disciplinas : curso.disciplinas
        }
    })
}

exports.delete = async(id) => {
    return await Curso.findByIdAndDelete(id);
}