const express = require("express");
const router = express.Router();
const {registrerUser, loginUser, getUsers } = require('../Controller/usuarios.controller')
const { checkToken } = require('../middleware/auth');

//Rutas de autenticacion 
router.post("/registrer", registrerUser);
router.post("/login", loginUser);
router.get("/listUsers", middle, getUsers);







module.exports = router;
