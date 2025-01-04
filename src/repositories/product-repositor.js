'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product'); 

// Busca todos os produtos ativos com campos selecionados
exports.get = async () => {
    return await Product.find({ active: true }, 'title price slug');
};

// Busca um produto pelo slug
exports.getBySlug = async (slug) => {
    return await Product.findOne({ slug: slug, active: true }, 'title description price slug tags');
};

// Busca um produto pelo ID
exports.getById = async (id) => {
    return await Product.findById(id);
};

// Busca produtos pela tag
exports.getByTag = async (tag) => {
    return await Product.find({ tags: tag, active: true }, 'title description price tags');
};

// Cria um novo produto
exports.create = async (body) => {
    const product = new Product(body); // Instancia a classe Product
    return await product.save();
};

// Atualiza produto
exports.update = async (id, data) => {
    return await Product.findByIdAndUpdate(
        id, 
        {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        },
        { new: true } // Retorna o documento atualizado
    );
};

// Deleta produto por id
exports.delete = async (id) => {
    try {
        const result = await Product.findByIdAndDelete(id); // Alterado para findByIdAndDelete
        if (!result) {
            throw new Error('Produto não encontrado');
        }
        return result;
    } catch (e) {
        throw new Error('Erro ao deletar produto: ' + e.message);
    }
};
