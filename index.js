//imports
const express = require('express');
require('dotenv').config();
const fs = require('fs');
const routes = require ("./api/routes/routes.js");
const cloudinary = require("cloudinary").v2

//Variable de entorno
const connectDB = require('./utils/db-mongo');
connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});
//Servidor
const server = express();
server.use(express.json());
server.use("/", routes);

//puerto mediante el cual se ejecutará el servidor

const port = 3500;
server.listen(process.env.PORT, () => {
console.log(`Servidor corriendo por : http://localhost:${port}`);});