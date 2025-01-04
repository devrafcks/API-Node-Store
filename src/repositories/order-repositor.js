'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

// Função para buscar pedidos com dados relacionados (customer, items.product)
exports.get = async () => {
    try {
        // Busca os pedidos com populações para customer e items.product
        const orders = await Order
            .find({}, 'number status customer items')
            .populate('customer', 'name')  // Popula o nome do cliente
            .populate('items.product', 'title');  // Popula o título do produto
        return orders;
    } catch (e) {
        throw new Error('Erro ao buscar pedidos: ' + e.message);  // Captura erros na busca
    }
};

// Função para criar um novo pedido
exports.create = async (data) => {
    try {
        // Validação simples para verificar se os dados obrigatórios estão presentes
        if (!data.customer || !data.items || data.items.length === 0) {
            throw new Error('Dados inválidos: Cliente e itens são obrigatórios.');
        }

        const order = new Order(data);  // Cria uma instância do modelo Order
        await order.save();  // Salva o pedido no banco de dados
        return order;  // Retorna o pedido criado
    } catch (e) {
        throw new Error('Erro ao criar pedido: ' + e.message);  // Captura erros na criação
    }
};
