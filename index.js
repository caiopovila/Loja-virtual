var loja = require('./server/loja');

const porta = process.env.PORT || 3000;

loja.listen(porta, function () {
  console.log(`Iniciado na porta ${porta}!`);
});