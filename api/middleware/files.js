const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorageloudinaryStorage, CloudinaryStorage} = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"img-eventos",
        allowedFormats:["jpg", "png", "gif", "jpeg"]
    }
});

const upload = multer({storage});
module.exports = upload;