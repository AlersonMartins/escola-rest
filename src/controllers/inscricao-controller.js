'use strict'

const mongoose = require('mongoose');

const validators = require('../validators/array');
const repository = require('../repositories/inscricao-repository');

exports.get = async(req, res, next) => {
    try {
        res.status(200).send(await repository.get());
    } catch (error) {
        res.status(500).send({error: 'Desculpe, houve algum erro com o servidor'});
    }
}

exports.getByCodigoTurma = async(req, res, next) => {
    try {
        const codigoTurma = req.params.codigoTurma;
        res.status(200).send(await repository.getByCodigoTurma(codigoTurma))
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
}

exports.getByMatriculaAluno = async(req, res, next) => {
    try {
        const matricula = req.params.matricula;
        res.status(200).send(await repository.getByMatriculaAluno(matricula))
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
}

exports.post = async(req, res, next) => {
    try {
        const variables = {
            situacao: [req.body.situacao, 'A situação da inscrição não foi informada. Adicione o paramêtro situacao: situação da inscricao, em seu json', 400],
            matriculaAluno: [req.body.matriculaAluno, 'A matrícula do aluno não foi informada. Adicione o paramêtro matriculaAluno: matricula do aluno, em seu json', 400],
            codigoTurma: [req.body.codigoTurma, 'O código da turma não foi informado. Adicione o paramêtro codigoTurma: código da turma, em seu json', 400],
            ano: [req.body.ano, 'O ano da inscrição não foi informado. Adicione o paramêtro ano: ano da inscricao, em seu json', 400],
            semestre: [req.body.semestre, 'O semestre da inscrição não foi informada. Adicione o paramêtro situacao: situação da inscricao, em seu json', 400]
        };
        validators.verifyVariables(variables);
        const inscricao = await repository.getByMatriculaECodigo(req.body.matriculaAluno, req.body.codigoTurma);
        if (inscricao) {
            throw {
                message: 'Já existe uma inscrição com o código da turma e a matricula do aluno informado',
                status: 400
            };
        }
        await repository.create(req.body);
        res.status(201).send({
            success: `Inscrição: ${req.body.matriculaAluno} - ${req.body.codigoTurma} criada com sucesso`
        });
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.put = async(req, res, next) => {
    try {
        const inscricao = await repository.getByMatriculaECodigo(req.params.matriculaAluno, req.params.codigoTurma);
        if (inscricao) {
            await repository.edit(inscricao._id, req.body, inscricao);
            res.status(200).send({
                success: `Inscrição: ${req.params.matriculaAluno} - ${req.params.codigoTurma} alterada com sucesso`
            });
        } else {
            throw {
                message: 'Não foi encontrada nenhuma inscrição com os dados informados',
                status: 400
            };
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.delete = async(req, res, next) => {
    try {
        const inscricao = await repository.getByMatriculaECodigo(req.params.matriculaAluno, req.params.codigoTurma);
        if (!inscricao) {
            throw {
                message: 'Não foi encontrado nenhuma inscrição com os dados informados',
                status: 400
            };
        } else {
            await repository.delete(inscricao._id);
            res.status(200).send({
                success: `Inscrição: ${req.params.matriculaAluno} - ${req.params.codigoTurma} removida com sucesso`
            })
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};