let criar = require('../conexao/criar');
require('dotenv').config();

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    try {
        let con = new criar;
        let param = [ user.id_usuario ];
        let comando = 'SELECT * FROM lista_endereco_usuarios WHERE id_usuario = ?';
        con.conectar();
        con.comando(comando, param).then(result => {
            done(null, result[0]);
        });
    } catch (error) {
        done(error);
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
  },(username, password, done) => {
    try {
        let con = new criar;
        let param = [ username, password ];
        let comando = 'CALL entrar_usuario(?, ?)';
        con.conectar();
        con.comando(comando, param).then(result => {
            if (result[0][0].id_usuario) {
                return done(null, result[0][0]);
            } else {
                return done(null, false);
            };

        });
    } catch (error) {
        return done(error);
    }
}));

passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
        profileFields: ['id', 'displayName', 'email']
    },
    (accessToken, refreshToken, profile, cb) => {
        try {
            console.log(profile);
            let con = new criar;
            let param = [ profile.emails[0].value ];
            let comando = 'SELECT * FROM lista_endereco_usuarios WHERE email = ?';
            con.conectar();
            con.comando(comando, param).then(result => {
                if (result.length > 0) {
                    cb(null, result[0]);
                } else {
                    cb(null, false, profile);
                };
            });
        } catch (error) {
            cb(error);
        }
    }
));

module.exports = {
    passport
};