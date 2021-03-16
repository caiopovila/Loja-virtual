var express = require('express');

var { pegar_coments, del_coment } = require('../controle/controleCad');
var { Valida } = require('../controle/controleMid');

let rota = express.Router();

rota.get('/', [ Valida ], async (req, res) => {
      let coments = await pegar_coments(req.user.id_usuario);

      res.render('comentarios', {
          usu: req.user,
          cat: res.locals.categorias,
          coments: coments
      });
});

rota.get('/del:cmt', [ Valida ], async (req, res) => {
    await del_coment(req.params.cmt, req.user.id_usuario);

    res.redirect('back');
});

module.exports = rota;