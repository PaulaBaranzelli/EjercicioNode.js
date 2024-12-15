const jwt = require("jsonwebtoken")

const createToken = (data) => {
    
    const data = {
        user_id: info._id,
        email: info.email
    }

   return jwt.sign(data, process.env.SECRET_KEY_JWT, {expiresIn: "1h"})
}

module.exports = {createToken}