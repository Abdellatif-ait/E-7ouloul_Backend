const jwt = require('jsonwebtoken')

function generateToken(id) {
    return jwt.sign({ id }, env('JWT_SECRET'), { expiresIn: '1h' })
}
module.exports = generateToken