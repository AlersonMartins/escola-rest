'use strict'

const mongoose = require('mongoose');

const validators = require('../validators/array');
const repository = require('../repositories/disciplina-repository');
const cursoRepository = require('../repositories/curso-repository');

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

exports.post = async(req, res, next) => {
    try {
        const variables = {
            title: [req.body.title, 'O título da disciplina não foi informada. Adicione o paramêtro title: Nome da disciplina, em seu json', 400]
        };
        validators.verifyVariables(variables);
        const disciplina = await repository.getByTitle(req.body.title);
        if (disciplina) {
            throw {
                message: 'Já existe uma disicplina com esse nome',
                status: 400
            };
        }
        await repository.create(req.body);
        res.status(201).send({
            success: `Disciplina: '${req.body.title}' criada com sucesso`
        });
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.put = async(req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        let disciplina = await repository.getById(req.body.title);
        if (disciplina) {
            if (req.body && req.body.title) {
                const d = await repository.getByTitle(req.body.title);
                if (d && d.id != disciplina.id) {
                    throw {
                        message: 'Não foi possível alterar, já existe uma disciplina com esse nome'
                    }
                }
            }
            await repository.edit(id, req.body, disciplina);
            res.status(200).send({
                success: `Disciplina: ${req.body.title} alterada com sucesso`
            });
        } else {
            throw {
                message: 'Não foi encontrada nenhuma disciplina com o id informado',
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
        const disciplina = await repository.delete(id);
        if (!disciplina) {
            throw {
                message: 'Não foi encontrado nenhuma disciplina com o id informado',
                status: 400
            };
        } else {
            res.status(200).send({
                success: `Disciplina: '${disciplina.title}' removido com sucesso`
            })
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};