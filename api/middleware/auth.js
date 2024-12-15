const jwt = require("jsonwebtoken");
const Users = require("../models/usuarios.model");
const Usuarios = require("../models/usuarios.model");



const checkToken = async (req, res, next) => { //hecha
    
    if(!req.headers["authorization"]){
        return res.status(401).json({message: "debe incluir el token"})
    }

    const token = req.headers['authorization'];
    let data

    try{
        const partes = token.split(' ');
        if (partes.length !== 2 || partes[0] !== 'Bearer') {
            return res.status(400).json({ message: "Formato de token incorrecto." });
        }

        const tokenVe = partes[1];

        data = jwt.verify(tokenVe, process.env.SECRET_KEY_JWT);
    } catch(error){
        return res.status(401).json({message: "el token es incorrecto"});
    }
    const user = await Usuarios.findById(data.user_id);
    if(!user){
        return res.status(404).json({message: "el usuario no existe"});
    }
    req.user = user;
    next();
};

module.exports = {checkToken};