'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

// Rota get
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);

// Rota post
router.post('/', controller.post);

// Rota put
router.put('/:id', controller.put);

// Rota delete
router.delete('/:id', controller.delete);

module.exports = router;