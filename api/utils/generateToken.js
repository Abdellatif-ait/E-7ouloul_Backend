const jwt = require('jsonwebtoken')

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' })
}
module.exports = generateToken