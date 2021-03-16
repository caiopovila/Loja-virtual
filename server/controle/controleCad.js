let criar = require('../conexao/criar');

const cadastrar = (nome, email, senha, sc) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ nome, email, senha, sc ];
            let comando = 'CALL cadastro(?, ?, ?, ?)';
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const atualizar = (nome, email, senhaA, senha, id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ nome, email, senhaA, senha, id ];
            let comando = 'CALL atualizar_cadastro(?, ?, ?, ?, ?)';
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const atualizar_foto = (id, foto) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ foto, id ];
            let comando = 'UPDATE usuarios SET foto_perfil = ? WHERE id_usuario = ?';
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const atualizar_end = (id_end, estado, cidade, logradouro, numero, cep, id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ id_end, estado, cidade, logradouro, numero, cep, id ];
            let comando = 'CALL atualizar_endereco(?, ?, ?, ?, ?, ?, ?)';
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const cadastrar_end = (estado, cidade, logradouro, numero, cep, id) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ estado, cidade, logradouro, numero, cep, id ];
            let comando = 'CALL endereco_usuario(?, ?, ?, ?, ?, ?)';
            con.conectar();
            con.comando(comando, param).then(result => {
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    })
);

const del_coment = (id, usu) => (
    new Promise((resolve, reject) => {
        try {
            let con = new criar;
            let param = [ id, usu ];
            let comando = 'CALL deletar_comentario(?, ?)';
            con.conectar();
            con.comando(comando, param).then(result => {
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
            let comando = 'SELECT * FROM lista_comentarios WHERE id_usuario = ?';
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
    cadastrar,
    atualizar,
    atualizar_end,
    cadastrar_end,
    del_coment,
    atualizar_foto,
    pegar_coments
};