var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var H = require('handlebars-helpers');
var path = require('path');
var helmet = require('helmet');
var passport = require('passport');
var flash = require('connect-flash');

var inicio = require('./rotas/rotaInicio');
var cat = require('./rotas/rotaCategoria');
var prod = require('./rotas/rotaProduto');
var cad = require('./rotas/rotaCad');
var ncad = require('./rotas/rotaNcad');
var entrar = require('./rotas/rotaEntrar');
var coment = require('./rotas/rotaComent');
var car = require('./rotas/rotaCar');
var fin = require('./rotas/rotaFin');

var { md } = require('./controle/controleMid');

const loja = express();
const multihelpers = H();

loja.use(helmet());

loja.engine('.hbs', hbs({helpers: multihelpers,
                       extname: '.hbs'}));

loja.set('view engine', '.hbs');

loja.use(bodyParser.urlencoded({ extended: true }));

loja.use(bodyParser.json());

loja.use(express.static(path.join(__dirname, '../public')));

loja.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    },
    secret: 'aaaa'
}));

loja.use(md);

loja.use(flash());

loja.use(passport.initialize());
loja.use(passport.session());

loja.use('/inicio', inicio);
loja.use('/categorias', cat);
loja.use('/produto', prod);
loja.use('/entrar', entrar);
loja.use('/cadastrar', ncad);
loja.use('/cadastro', cad);
loja.use('/carrinho', car);
loja.use('/comentarios', coment);
loja.use('/finalizar', fin);

loja.use('/', (req, res) => {
    res.redirect('/inicio');
});

module.exports = loja;