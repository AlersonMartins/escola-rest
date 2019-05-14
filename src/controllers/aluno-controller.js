'use strict'

const mongoose = require('mongoose');

const validators = require('../validators/array');
const repository = require('../repositories/aluno-repository');
const cursoRepository = require('../repositories/curso-repository');

exports.get = async(req, res, next) => {
    try {
        res.status(200).send(await repository.get());
    } catch (error) {
        res.status(500).send({error: 'Desculpe, houve algum erro com o servidor'});
    }
}

exports.getByMatricula = async(req, res, next) => {
    try {
        const matricula = req.params.matricula;
        res.status(200).send(await repository.getByMatricula(matricula))
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
}

exports.post = async(req, res, next) => {
    try {
        const variables = {
            matricula: [req.body.matricula, 'A matrícula do aluno não foi informada. Adicione o paramêtro matricula: Matrícula do aluno, em seu json', 400],
            nome: [req.body.nome, 'O nome do aluno não foi informado. Adicione o paramêtro nome: nome do aluno, em seu json', 400],
            dataNascimento: [req.body.dataNascimento, 'A data de nascimento do aluno não foi informada. Adicione o paramêtro dataNascimento: DataNascimento do aluno, em seu json', 400],
            idade: [req.body.idade, 'A idade do aluno não foi informada. Adicione o paramêtro idade: Idade do aluno, em seu json', 400],
            estadoCivil: [req.body.estadoCivil, 'O estado civil do aluno não foi informado. Adicione o paramêtro estadoCivil: Estado civil do aluno, em seu json', 400],
            telefones : [req.body.telefones, 'Os telefones do aluno não foram informados. Adicione o paramêtro telefones[]: numero de telefone, em seu json', 400],
            curso: [req.body.curso, 'O curso do aluno não foi informado. Adicione o paramêtro Curso: id do curso, em seu json', 400],
        };
        validators.verifyVariables(variables);
        const aluno = await repository.getByMatricula(req.body.matricula);
        const curso = await cursoRepository.getById(mongoose.Types.ObjectId(req.body.curso));
        if (aluno) {
            throw {
                message: 'Matrícula existente. Insira uma matrícula válida.',
                status: 400
            };
        }
        if (!curso) {
            throw {
                message: 'Não foi encontrado nenhum curso com o id informado',
                status: 400
            };
        }
        await repository.create(req.body);
        res.status(201).send({
            success: `Aluno: '${req.body.matricula}' inserido com sucesso`
        });
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.put = async(req, res, next) => {
    try {
        const matricula = req.params.matricula;
        const variables = {
            matricula: [req.params.matricula, 'A matrícula do aluno não foi informada. Adicione o paramêtro matricula: Matrícula do aluno, em seu json', 400]
        };
        validators.verifyVariables(variables);
        let aluno = await repository.getByMatricula(req.params.matricula);
        if (!aluno) {
            throw {
                message: 'Não foi encontrado nenhum aluno com a matrícula informada',
                status: 400
            };
        }
        aluno = await repository.edit(matricula, req.body, aluno);
        res.status(200).send({
            success: `Aluno: ${req.params.matricula} alterada com sucesso`
        });
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

exports.delete = async(req, res, next) => {
    try {
        const matricula = req.params.matricula;
        if (matricula) {
            let aluno = await repository.getByMatricula(matricula);
            if (!aluno) {
                throw {
                    message: 'Não foi encontrado nenhum aluno com a matricula informada',
                    status: 400
                };
            } else {
                await repository.edit(matricula, { matriculaAtiva: false }, aluno);
                res.status(200).send({
                    success: `Matrícula do Aluno: '${aluno.nome}' inativada com sucesso`
                })
            }
        }
    } catch (error) {
        res.status((error && error.status) ? error.status : 400).send({error: error.message});
    }
};

