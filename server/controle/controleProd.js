let criar = require('../conexao/criar');

const pegaUm = (id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ id ];
            let com = 'SELECT * FROM lista_produto_info WHERE produto = ?';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const pegaAll = () => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = null;
            let com = 'SELECT * FROM lista_produto_info';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);


const pegaCor = (id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ id ];
            let com = 'SELECT DISTINCT cor FROM produtos_detalhes WHERE produto = ?';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const pegaTamanho = (id, cor) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ id, cor ];
            let com = 'SELECT DISTINCT tamanho FROM produtos_detalhes WHERE produto = ? AND cor = ?';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const pegaImgs = (id_prod) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ id_prod ];
            let com = 'SELECT * FROM imagens WHERE produto = ?';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const pegar_coments = (id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ id ];
            let comando = 'SELECT * FROM lista_comentarios WHERE id_produto = ?';
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const postComet = (id_prod, id_usu, coment) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            con.conectar();
            let param = [ id_prod, id_usu, coment  ];
            let com = 'CALL criar_comentario(?, ?, ?)';
            con.comando(com, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

module.exports = { pegaUm, pegaCor, pegaImgs, pegaAll,
    pegar_coments, pegaTamanho, postComet };
