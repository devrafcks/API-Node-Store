'use strict';

const ValidationContract = require('../validator/validator');
const repository = require('../repositories/customer-repositor');
const md5 = require('md5');
const authService = require('../services/auth-service');
const emailService = require('../services/email-service');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        return res.status(400).send(contract.errors());
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });

        emailService.send(
            req.body.email,
            'Bem-vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        );

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        console.error(e);  // Log para depuração
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message || e  // Detalhamento do erro
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            return res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        console.error(e);  // Log para depuração
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message || e  // Detalhamento do erro
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            return res.status(404).send({
                message: 'Cliente não encontrado'
            });
        }

        const newToken = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: newToken,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        console.error(e);  // Log para depuração
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message || e  // Detalhamento do erro
        });
    }
};
