'use strict'

const mongoose = require('mongoose');
const Disciplina = mongoose.model('Disciplina');

exports.get = async() => {
    return await Disciplina.find();
}

exports.getById = async(id) => {
    return await Disciplina.findById(id);
}

exports.getByCourseId = async(id) => {
    return await Disciplina.findOne({
        curso: id
    });
}

exports.getByTitle = async(title) => {
    return await Disciplina.findOne({
        title: title
    });
}

exports.create = async(data) => {
    return await Disciplina.create(data);
}

exports.edit = async(id, data) => {
    return await Disciplina.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            curso: mongoose.Types.ObjectId(data.curso)
        }
    })
}

exports.delete = async(id) => {
    return await Disciplina.findByIdAndDelete(id);
}