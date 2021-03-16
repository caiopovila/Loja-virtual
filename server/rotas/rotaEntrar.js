var express = require('express');

var { passport } = require('../controle/controleAut');

let rota = express.Router();

rota.get('/sair', (req, res) => {
    req.session.destroy();
    req.logout();
    res.redirect('back');
});

rota.post('/', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

rota.get('/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));

rota.get('/facebook/call', (req, res, next) => {
    passport.authenticate('facebook', function (err, user, info) {
        if (err) {
            res.redirect('erro', {
                m: err
            });
        }
        if (!user) {
            req.flash('error', 'Informe uma senha.');
            req.session.save(() => {
                req.session.info = info;
                res.redirect('/cadastrar');
            });
        } else
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('back');
        });
    })(req, res, next);
});

module.exports = rota;