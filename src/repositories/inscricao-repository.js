'use strict'

const mongoose = require('mongoose');
const Inscricao = mongoose.model('Inscricao');

exports.get = async() => {
    return await Inscricao.find();
}

exports.getByCodigoTurma = async(codigoTurma) => {
    return await Inscricao.find({
        codigoTurma
    });
}

exports.getByMatriculaAluno = async(matriculaAluno) => {
    return await Inscricao.find({
        matriculaAluno
    });
}

exports.getByMatriculaECodigo = async(matricula, codigo) => {
    return await Inscricao.findOne({
        matriculaAluno: matricula,
        codigoTurma: codigo
    });
}

exports.create = async(data) => {
    return await Inscricao.create(data);
}

exports.edit = async(id, data, inscricao) => {
    return await Inscricao.findByIdAndUpdate(id, {
        $set: {
            avaliacao1: data.avaliacao1 ? data.avaliacao1 : inscricao.avaliacao1,
	        avaliacao2: data.avaliacao2 ? data.avaliacao2 : inscricao.avaliacao2,
	        media: data.media ? data.media : inscricao.media,
	        numFaltas: data.numFaltas ? data.numFaltas : inscricao.numFaltas,
	        situacao: data.situacao ? data.situacao : inscricao.situacao,
	        ano: data.ano ? data.ano : inscricao.ano,
	        semestre: data.semestre ? data.semestre : inscricao.semestre,
        }
    })
}

exports.delete = async(id) => {
    return await Inscricao.findByIdAndDelete(id);
}