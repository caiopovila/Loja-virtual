var express = require('express');

var { pega_car, add_car, atu_car, rm_i_car } = require('../controle/controleCar');
var { pegaUm } = require('../controle/controleProd');
var { Valida } = require('../controle/controleMid');

let rota = express.Router();

rota.get('/', async (req, res) => {
    res.render('carrinho', {
        usu: req.user,
        cat: res.locals.categorias,
    });
});

module.exports = rota;