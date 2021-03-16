var express = require('express');
var multer = require('multer');
var path = require('path');

var {
    atualizar,
    atualizar_end,
    cadastrar_end,
    atualizar_foto
} = require('../controle/controleCad');
var {
    Valida,
    base64_encode
} = require('../controle/controleMid');

let rota = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

rota.get('/', [ Valida ], (req, res) => {
    if (req.user.foto_perfil)
    req.user.foto_perfil = req.user.foto_perfil.toString('base64');
    else
    req.user.foto_perfil = base64_encode(path.join(__dirname, '../../public/img/fotoperfil.png'));
    res.render('cadastro', {
        usu: req.user,
        cat: res.locals.categorias
    });
});

rota.get('/foto/remove', [ Valida ], async (req, res) => {
    await atualizar_foto(req.user.id_usuario, null);

    res.redirect('/cadastro');
});

rota.post('/foto', [Valida], upload.single('imgUp'), async (req, res) => {
    try {

        let at = await atualizar_foto(req.user.id_usuario, req.file.buffer);

        res.redirect('back');

    } catch (error) {
        res.render('erro', {
            usu: req.user,
            cat: res.locals.categorias,
            m: error
        });
    }
});

rota.post('/usu', [Valida], async (req, res) => {
    try {
        let ncad = await atualizar(req.body.nome, req.body.email, req.body.sA, req.body.nS, req.user.id_usuario);

        if (req.user.foto_perfil)
            req.user.foto_perfil = req.user.foto_perfil.toString('base64');
            
        if (ncad[0][0]['E']) {
            res.render('cadastro', {
                usu: req.user,
                cat: res.locals.categorias,
                m: ncad[0][0]['E']
            });
        } else if (ncad[0][0].id_usuario) {
            req.user = ncad[0][0];
            if (req.user.foto_perfil)
            req.user.foto_perfil = req.user.foto_perfil.toString('base64');
            else
            req.user.foto_perfil = base64_encode(path.join(__dirname, '../../public/img/fotoperfil.png'));
            res.render('cadastro', {
                usu: req.user,
                cat: res.locals.categorias,
                s: 'Salvo com sucesso.'
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

rota.post('/end', [Valida], async (req, res) => {
    try {
        let ncad;
        if (req.user.id_endereco == null)
            ncad = await cadastrar_end(req.body.est, req.body.cid, req.body.log, req.body.num, req.body.cep, req.user.id_usuario);
        else
            ncad = await atualizar_end(req.user.id_endereco, req.body.est, req.body.cid, req.body.log, req.body.num, req.body.cep, req.user.id_usuario);

            if (req.user.foto_perfil)
            req.user.foto_perfil = req.user.foto_perfil.toString('base64');
            
            
        if (ncad[0][0]['E']) {
            res.render('cadastro', {
                usu: req.user,
                cat: res.locals.categorias,
                m: ncad[0][0]['E']
            });
        } else if (ncad[0][0].id_usuario) {
            req.user = ncad[0][0];
            if (req.user.foto_perfil)
            req.user.foto_perfil = req.user.foto_perfil.toString('base64');
            else
            req.user.foto_perfil = base64_encode(path.join(__dirname, '../../public/img/fotoperfil.png'));
            res.render('cadastro', {
                usu: req.user,
                cat: res.locals.categorias,
                s: 'Salvo com sucesso.'
            });
        }
    } catch (error) {
        res.render('erro', {
            usu: req.user,
            cat: res.locals.categorias,
            m: error
        });
    }
});

rota.get('/usu', [Valida], (req, res) => {
    res.redirect('/cadastro');
});

rota.get('/end', [Valida], (req, res) => {
    res.redirect('/cadastro');
});

module.exports = rota;