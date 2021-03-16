let criar = require('../conexao/criar');

const pega_car = (id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ id ];
            let comando = 'SELECT * FROM lista_carrinhos WHERE id_usuario = ?';
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const add_car = (prod, idcli, quant) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ prod, idcli, quant ];
            let comando = `CALL criar_carrinho(?, ?, ?)`;
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const rm_car = (idcar, usu) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ idcar, usu ];
            let comando = `CALL deletar_carrinho(?, ?)`;
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);


module.exports = { 
    pega_car,
    add_car,
    rm_car
};