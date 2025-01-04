'use strict';

const express = require('express');
const router = express.Router();

//rota padrão da api
const rotaApi = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "1.0.0"
    });
});

module.exports = router;