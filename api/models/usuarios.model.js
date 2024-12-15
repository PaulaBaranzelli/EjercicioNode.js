const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    id: {type:String, require: true},
    username: {type:String, require: true, unique:true},
    password: {type:String, require: true},
    role: {type:String, enum: ["admin", "client"], default: "client"}

},{
    collection: 'usuarios',
    timestamps: true
  }
);

const Usuarios = mongoose.model("usuarios", usuarioSchema);
module.exports = Usuarios;