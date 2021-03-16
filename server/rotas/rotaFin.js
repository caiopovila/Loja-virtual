var express = require('express');

var { pega_car } = require('../controle/controleCar');
var { pegaUm } = require('../controle/controleProd');
var { finalizar, fin_det } = require('../controle/controleFin');
var { Valida } = require('../controle/controleMid');

let rota = express.Router();

rota.get('/', [ Valida ], async (req, res) => {
    let carri = await pega_car(req.user.id_usuario);
    
    let obj = [];
    for (let item of carri) {
        let b = [];
        let preco = 0;
        b.push({id: item.carrinho, estado: item.estado});
        for (let prod of item.produtos) {
            let a = await pegaUm(prod);
            if (a.length > 0) {
                preco += a[0].preco;
                b.push(a[0]);
            }
        };
        b.push({soma: preco});
        obj.push(b);
    };
    
    res.render('finalizar', {
        usu: req.user,
        cat: res.locals.categorias,
        prods: obj
    });
});

rota.post('/', [ Valida ], async (req, res) => {
    let fin = await finalizar(req.user.id_usuario, req.user.id_endereco, req.body.car, 1, req.body.total);
    console.log(fin);
    
    if(fin[0][0]['E']) {
        res.render('cadastrar', {
            usu: req.user,
            cat: res.locals.categorias,
            m: fin[0][0]['E']
        });
    } else
    res.redirect('/carrinho');
});

rota.get('/detalhes/:car', [ Valida ], async (req, res) => {
    let det = await fin_det(req.user.id_usuario, req.params.car);
    console.log(det);
    
    if(det[0].id_compra) {
        res.render('detalhe', {
            usu: req.user,
            cat: res.locals.categorias,
            det: det[0]
        });
    } else
        res.render('erro', {
            usu: req.user,
            cat: res.locals.categorias,
            m: det[0]['E']
        });
    
});



module.exports = rota;