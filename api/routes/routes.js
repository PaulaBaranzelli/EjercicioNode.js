const express = require("express");
const router = express.Router();

router.use("/usuarios", require ("../routes/usuarios.routes"));
router.use("/eventos", require ("../routes/eventos.routes"));

module.exports= router;