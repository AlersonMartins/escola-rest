'use strict'

const mongoose = require('mongoose');

const validators = require('../validators/array');
const repository = require('../repositories/turma-repository');
const disciplinaRepository = require('../repositories/disciplina-repository');

exports.get = async(req, res, next) => {
    try {
        res.status(200).send(await repository.get());
    } catch (error) {
        res.status(500).send({error: 'Desculpe, houve algum erro com o servidor'});
    }
}

exports.getById = async(req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        res.status(200).send(await repository.getById(id))
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
}

exports.getByCodigo = async(req, res, next) => {
    try {
        const codigo = mongoose.Types.ObjectId(req.params.codigo);
        res.status(200).send(await repository.getByCodigo(codigo))
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
}

exports.post = async(req, res, next) => {
    try {
        const variables = {
            codigo: [req.body.codigo, 'O codigo da turma não foi informado. Adicione o paramêtro codigo: codigo da turma, em seu json', 400],
            semestre: [req.body.semestre, 'O semestre da turma não foi informado. Adicione o paramêtro semestre: Semestre da turma, em seu json', 400],
            ano: [req.body.ano, 'O ano letivo não foi informado. Adicione o paramêtro ano: Ano letivo, em seu json', 400],
            disciplina: [req.body.disciplina, 'O id da disciplina a qual a turma recebe não foi informado. Adicione o paramêtro disciplina: id da disciplina, em seu json', 400]
        };
        validators.verifyVariables(variables);
        const turma = await repository.getByCodigo(req.body.codigo);
        const disciplina = await disciplinaRepository.getById(mongoose.Types.ObjectId(req.body.disciplina));
        if (turma) {
            throw {
                message: 'Já existe turma cadastrada com este código.',
                status: 400
            };
        }
        if (!disciplina) {
            throw {
                message: 'Não foi encontrada nenhuma disciplina com o id informado',
                status: 400
            };
        }
        await repository.create(req.body);
        res.status(201).send({
            success: `Turma: '${req.body.codigo}' criada com sucesso`
        });
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.put = async(req, res, next) => {
    try {
        const codigo = req.params.codigo;
        const variables = {
            codigo: [codigo, 'O codigo da turma não foi informado. Adicione o paramêtro codigo: codigo da turma, em seu json', 400]
        };
        validators.verifyVariables(variables);
        let turma = await repository.getByCodigo(codigo);
        if (turma) {
            turma = await repository.edit(turma._id, req.body, turma);
            if (!turma) {
                throw {
                    message: 'Não foi encontrada nenhuma turma com o código informado.',
                    status: 400
                };
            }
            res.status(200).send({
                success: `Turma: ${codigo} alterada com sucesso`
            });
        } else {
            throw {
                message: 'Esta turma já foi cadastrada neste semestre.',
                status: 400
            };
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.delete = async(req, res, next) => {
    try {
        const codigo = req.params.codigo;
        const turma = await repository.delete(codigo);
        if (!turma) {
            throw {
                message: 'Não foi encontrado nenhuma turma com o codigo informado',
                status: 400
            };
        } else {
            res.status(200).send({
                success: `Turma: '${turma.codigo}' removida com sucesso`
            })
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

