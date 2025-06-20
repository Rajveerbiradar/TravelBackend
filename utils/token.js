const jwt = require('jsonwebtoken')
const config = require('../config/config')

const createToken = (userID) => {
    return jwt.sign({userID}, config.jwtSecret, {expiresIn : '1h'});
}

module.exports = createToken;