var express = require('express');
var cat = require('../controle/controleCate');
var { pegaImgs } = require('../controle/controleProd');
let rota = express.Router();

rota.get('/:cat', async (req, res) => {
    if (req.params.cat) {
      let prod = await cat.pegaUm(req.params.cat);
        obD = [];
        for (let item of prod) {
            let img = await pegaImgs(item.produto);
            obD.push({id_produto: item.produto, img: img[0], nome: item.nome, preco: item.preco});
        }
      res.render('categoria', {
          usu: req.user,
          cat: res.locals.categorias,
          prod: obD
      });
    } else {
        res.render('erro', {
            usu: req.user,
            cat: res.locals.categorias,
            m: 'Não encontrado.'
        });
    }
});

module.exports = rota;