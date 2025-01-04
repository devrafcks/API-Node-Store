'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

// Cria um novo cliente
exports.create = async (data) => {
    try {
        var customer = new Customer(data);
        await customer.save();
    } catch (error) {
        throw new Error('Erro ao criar o cliente: ' + error.message);
    }
}

// Autentica um cliente
exports.authenticate = async (data) => {
    try {
        const res = await Customer.findOne({
            email: data.email,
            password: data.password
        });
        return res;
    } catch (error) {
        throw new Error('Erro ao autenticar o cliente: ' + error.message);
    }
}

// Busca um cliente pelo ID
exports.getById = async (id) => {
    try {
        const res = await Customer.findById(id);
        return res;
    } catch (error) {
        throw new Error('Erro ao buscar o cliente: ' + error.message);
    }
}
