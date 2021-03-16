var express = require('express');
var path = require('path');

var { pegaUm, pegaCor, pegaTamanho, pegaImgs, pegar_coments, postComet } = require('../controle/controleProd');
var { Valida, base64_encode } = require('../controle/controleMid');

let rota = express.Router();

rota.get('/:prod', async (req, res) => {
    if (req.params.prod) {
      let prod = await pegaUm(req.params.prod);
      let cor = await pegaCor(req.params.prod);
      let tamanho = await pegaTamanho(req.params.prod, cor[0].cor);
      let imgs = await pegaImgs(req.params.prod);
      let coment = await pegar_coments(req.params.prod);
        let obj = [];
      for (let item of coment) {
            if (item.foto_perfil)
            obj.push({id_comentario: item.id_comentario, id_produto: item.produto, foto_perfil: item.foto_perfil.toString('base64'), id_usuario: item.id_usuario, nome: item.nome, data_registro: item.data_registro, comentario: item.comentario});
            else
            obj.push({id_comentario: item.id_comentario, id_produto: item.produto, foto_perfil: base64_encode(path.join(__dirname, '../../public/img/fotoperfil.png')), id_usuario: item.id_usuario, nome: item.nome, data_registro: item.data_registro, comentario: item.comentario});
        };
      res.render('produto', {
          usu: req.user,
          cat: res.locals.categorias,
          prod: prod[0],
          cor: cor,
          tamanho: tamanho,
          coment: obj,
          imgs: imgs
      });
    } else {
        res.redirect('/');
    }
});

rota.get('/disp/:cor/:produto', async (req, res) => {
    let tamanho = await pegaTamanho(req.params.produto, req.params.cor);

    res.json(tamanho);
});


rota.post('/:prod', [ Valida ], async (req, res) => {
   try {
            let prod = await pegaUm(req.params.prod);
            let coment = await postComet(req.params.prod, req.user.id_usuario, req.body.coment);
            
            if (coment[0][0]['E']) {
                res.render('produto', {
                    usu: req.user,
                    cat: res.locals.categorias,
                    prod: prod[0],
                    m: coment[0][0]['E'],
                    coment: await pegaComet(req.params.prod)
                });
            } else {
                res.redirect('/produto/'+req.params.prod);
            }

   } catch (error) {
        res.render('erro', {
            usu: req.user,
            cat: res.locals.categorias,
            m: error
        });
   } 

});

module.exports = rota;