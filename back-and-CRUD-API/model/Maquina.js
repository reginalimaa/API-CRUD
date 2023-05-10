const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Maquina = new Schema({
  capacidade: {
    type: String
  },
  marca: {
    type: String
  },
  modelo: {
    type: String
  }
},{
    collection: 'maquina'
});

//exportando o modelo
module.exports = mongoose.model('Maquina', Maquina);