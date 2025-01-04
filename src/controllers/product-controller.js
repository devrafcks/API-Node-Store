'use strict';

const Product = require('../models/product-model');
const ValidationContract = require('../validator/validator');
const repository = require('../repositories/product-repositor');

// Retorna a lista de produtos
exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao buscar os produtos',
            data: e
        });
    }
};

// Retorna a lista de produto por id
exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data); 
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao buscar id',
            data: e
        });
    }
};

// Retorna a lista de produto pela tag
exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data); 
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao buscar tag',
            data: e
        });
    }
};

// Retorna a lista de produto pelo slug
exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao buscar os produtos',
            data: e
        });
    }
};

// Cadastra novos produtos
exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter mais de 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter mais de 2 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter mais de 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        return res.status(400).send(contract.errors()).end();
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ 
            message: 'Produto cadastrado com sucesso!' 
        });
    } catch (e) {
        res.status(400).send({ 
            message: 'Falha ao cadastrar o produto', 
            data: e 
        });
    }
};

// Atualiza produto
exports.put = async (req, res, next) => {
    const { id } = req.params; // Extraindo o ID da rota
    const updates = req.body; // Dados atualizados enviados no corpo da requisição

    try {
        const result = await repository.update(id, updates);
        if (!result) {
            return res.status(404).send({
                message: 'Produto não encontrado'
            });
        }
        res.status(200).send({
            message: 'Produto atualizado com sucesso!',
            data: result
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: error.message // Retorna detalhes do erro
        });
    }
};

// Deleta produto
exports.delete = async (req, res, next) => {
    try {
        // Garantir que o ID seja fornecido na URL
        const productId = req.params.id;
        
        // Chama o repositório para remover o produto
        const result = await repository.delete(productId);

        if (!result) {
            return res.status(404).send({ message: "Produto não encontrado!" });
        }

        // Retornar sucesso
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        console.error("Erro ao processar DELETE:", e.message);
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};
