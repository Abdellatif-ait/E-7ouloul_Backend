const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()
const isAuthRes = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        const responsable = jwt.verify(token, process.env.JWT_SECRET)
        req.res = responsable
        next()
    } catch (error) {
        res.clearCookie("token")
    }
}

module.exports = { isAuthRes }