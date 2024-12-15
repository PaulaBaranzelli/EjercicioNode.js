const bcrypt = require("bcrypt");
const Usuarios = require("../models/usuarios.model");
const Users = require("../models/usuarios.model");
const {createToken} = require("../../utils/jwt");


//Rutas de autenticacion
const registrerUser = async (req, res) =>{ 
   try {
      const newUser = req.body
      const userDb = await Usuarios.find({ email: newUser.email });
      if(userDb.length !== 0){
        return res.json({message: "El email ya está registrado"});
      }

      newUser.password = await bcrypt.hash(newUser.password, 10);
      const user = await Usuarios.create(newUser);
      return res.json(user);

   } catch (error){
    console.log(error);
    return res.status(500).json({ message: "No se pudo completar la acción" });
}
   };
 


const loginUser = async (req, res) =>{ 
    try {
        const {email, password} = req.body;
        const userDb = await Usuarios.findOne({email});
        if(!userDb){
            return res.status(404).json({message: "El email no existe"}) 
        }
        const same = await bcrypt.compare(password, userDb.password)
        if(!same){
            return res.status(404).json({message: "Contraseña Incorrecta"})
        }
        return res.json({
            message: "Login exitoso",
            token: createToken(userDb)
        })
    } catch (error){
     console.log(error);
     return res.status(500).json({message: "Se ha producido un error"});
    }
  
 };

const getUsers = async (req, res)=>{ 
    try{
        const user = req.Usuarios;
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const dataUsuarios = await Usuarios.find({email: req.user.email});
        return res.json(dataUsuarios);

    } catch (error){
        console.log(error);
        return res.status(500).json({ message: "No se pudo completar la acción"});
    }

};


module.exports = { registrerUser, loginUser, getUsers };