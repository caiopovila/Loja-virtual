var express = require('express');
var dest = require('../controle/controleDest');

var { pegaImgs } = require('../controle/controleProd');
let rota = express.Router();

rota.get('/', async (req, res) => {
    let d = await dest();
    obD = [];
    for (let item of d) {
        let img = await pegaImgs(item.id_produto);
        obD.push({id_produto: item.id_produto, img: img[0], nome: item.nome, preco: item.preco});
    }
    res.render('inicio', {
        usu: req.user,
        cat: res.locals.categorias,
        destaques: obD
    });
});

module.exports = rota;