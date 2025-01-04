'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');

// Rota get 
router.get('/', controller.get);

// Rota post
router.post('/', controller.post);

module.exports = router;
