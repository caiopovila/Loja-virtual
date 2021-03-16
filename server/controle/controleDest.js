let criar = require('../conexao/criar');

const pegaAll = () => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            con.comando('SELECT * FROM lista_destaques', null).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

module.exports = pegaAll;