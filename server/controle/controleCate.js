let criar = require('../conexao/criar');

const pegaAll = () => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            con.comando('SELECT * FROM categorias', null).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const pegaUm = (id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ id ];
            let com = 'SELECT * FROM lista_produto_info WHERE id_categoria = ?';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

module.exports = { pegaAll, pegaUm };