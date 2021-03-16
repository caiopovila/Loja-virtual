let criar = require('../conexao/criar');

const finalizar = (usu, end, car, fret, total) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ usu, end, car, fret, total ];
            let com = 'CALL finalizar_compra(?, ?, ?, ?, ?)';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const fin_det = (usu, car) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ usu, car ];
            let com = 'SELECT * from lista_compra_detalhe WHERE id_usuario = ? AND carrinho = ? ';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

module.exports = { finalizar, fin_det }; 