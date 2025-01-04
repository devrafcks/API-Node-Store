'use strict';

const repository = require('../repositories/order-repositor');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        // Busca todos os pedidos do banco
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        // Melhorar a mensagem de erro para fornecer mais detalhes
        console.error(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};

exports.post = async (req, res, next) => {
    try {
        // Verifica se o token foi passado na requisição
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        if (!token) {
            return res.status(400).send({ message: 'Token de autenticação não fornecido' });
        }

        // Decodifica o token para obter os dados do usuário
        const data = await authService.decodeToken(token);

        // Valida se os itens do pedido estão presentes na requisição
        if (!req.body.items || req.body.items.length === 0) {
            return res.status(400).send({ message: 'Pedido deve conter ao menos um item' });
        }

        // Cria o pedido com os dados do usuário e items recebidos
        await repository.create({
            customer: data.id,  // Id do cliente obtido do token
            number: guid.raw().substring(0, 6),  // Gera um número único para o pedido
            items: req.body.items  // Itens do pedido
        });

        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        // Tratar erros de forma mais detalhada e registrar o erro no console
        console.error(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};
