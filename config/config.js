require('dotenv').config()


exports.port = process.env.PORT
exports.dbUri = process.env.DB_URI
exports.jwtSecret = process.env.JWT_SECRET
