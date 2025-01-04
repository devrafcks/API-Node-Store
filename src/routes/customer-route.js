'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer');
const authService = require('../services/auth-service');

// Rota para criar um novo cliente
router.post('/', controller.post);

// Rota para autenticação de usuário (login)
router.post('/authenticate', controller.authenticate);

// Rota para refresh de token, protegida por autorização
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;
