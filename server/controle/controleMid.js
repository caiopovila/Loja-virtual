var express = require('express');
var fs = require('fs');

var cat = require('../controle/controleCate').pegaAll;

let md = express();

md.use( async (req, res, next) => {
    if (!res.locals.categorias) {
        res.locals.categorias = await cat();
    }
    next();
});

const Valida = ((req, res, next) => {
    if (!req.user) {
        req.session.reload(function(err) {
            res.redirect('/');
          })
    } else 
    next();
});


function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

module.exports = { md, Valida, base64_encode };
