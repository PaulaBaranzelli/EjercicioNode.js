const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventosSchema = new Schema({
    id: {type:String, require: true},
    nombre: {type:String, require: true, unique:true},
    descripcion: {type:String, require: true, unique:true},
    fecha: {type: date},
    ubicacion: {type:String},
    tipoDeporte: {type:String},
    organizador: {type:String},
    image: {type: String, default:''},
   
},{
    collection: 'eventos',
    timestamps: true,
  }
);

const Eventos = mongoose.model('eventos', eventosSchema);
module.exports = Eventos;