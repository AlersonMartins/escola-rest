'use strict'

const mongoose = require('mongoose');

const validators = require('../validators/array');
const repository = require('../repositories/curso-repository');
const alunoRepository = require('../repositories/aluno-repository');

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

exports.getByTitle = async(req, res, next) => {
    try {
        const variables = {
            title: [req.body.title, 'O título do curso não foi informado. Adicione o paramêtro title: Nome do curso, em seu json', 400]
        };
        validators.verifyVariables(variables);
        res.status(200).send(await repository.getByTitle(req.body.title));
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
}

exports.post = async(req, res, next) => {
    try {
        const variables = {
            title: [req.body.title, 'O título do curso não foi informado. Adicione o paramêtro title: Nome do curso, em seu json', 400]
        };
        validators.verifyVariables(variables);
        const curso = await repository.getByTitle(req.body.title);
        if (curso) {
            throw {
                message: 'Já existe um curso com esse nome',
                status: 400
            };
        }
        await repository.create(req.body);
        res.status(201).send({
            success: `Curso: '${req.body.title}' inserido com sucesso`
        });
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.put = async(req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        let curso = await repository.getById(id);
        if (curso) {
            if (req.body && req.body.title) {
                const c = await repository.getByTitle(req.body.title);
                if (c && c.id != curso.id) {
                    throw {
                        message: 'Não foi possível alterar, já existe um curso com esse nome'
                    }
                }
            }
            curso = await repository.edit(id, req.body, curso);
            res.status(200).send({
                success: `Curso: ${req.body.title ? req.body.title : curso.title} alterado com sucesso`
            });
        } else {
            throw {
                message: 'Não foi encontrado nenhum curso com o id informado',
                status: 400
            };
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.delete = async(req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const aluno = await alunoRepository.getByCourseId(id);
        if (!aluno) {
            const curso = await repository.delete(id);
            if (!curso) {
                throw {
                    message: 'Não foi encontrado nenhum curso com o id informado',
                    status: 400
                };
            } else {
                res.status(200).send({
                    success: `Curso: '${curso.title}' removido com sucesso`
                })
            }
        } else {
            throw {
                message: 'Não foi foi possível remover o curso, pois existem alunos matriculados.',
                status: 400
            };
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

