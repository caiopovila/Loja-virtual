let mysql = require('mysql');
let util = require('util');
let config = require('./config');

class criar {

  constructor() {
    this.conexao = mysql.createConnection(config);
   }
   
  conectar() {
    this.conexao.connect((err) => {
      if (err) throw err;
    });  
  }

  async comando (com, arg) {
    const query = util.promisify(this.conexao.query).bind(this.conexao);

      try {
        const rows = await query(com, arg);
        return rows;
      } finally {
        this.encerrar();
      }
    }

  encerrar() {
    this.conexao.end((err) => {
      if (err) throw err; 
    }); 
   }
}

module.exports = criar;