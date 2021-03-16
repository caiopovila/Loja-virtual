var express = require('express');

var { cadastrar } = require('../controle/controleCad');

let rota = express.Router();

rota.get('/', (req, res) => {
    res.render('cadastrar', {
        usu: req.user,
        cat: res.locals.categorias,
        info: req.session.info,
        m: req.flash('error')
    });
});

rota.post('/', async (req, res) => {
    try {
        
        let ncad = await cadastrar(req.body.nome, req.body.email, req.body.senha, req.body.senhaC);

        if(ncad[0][0]['E']) {
            res.render('cadastrar', {
                usu: req.user,
                cat: res.locals.categorias,
                info: req.session.info,
                m: ncad[0][0]['E']
            });
        } else if (ncad[0][0].id_usuario) {

            req.login(ncad[0][0], function(err) {
                if (err) { return next(err); }
                    return res.redirect('/');
                });
       
        } else console.log(ncad);
    } catch (error) {
        res.render('erro', {
            usu: req.user,
            cat: res.locals.categorias,
            m: error
        });   
    } 
});


module.exports = rota;