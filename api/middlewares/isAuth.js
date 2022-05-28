const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()
const isAuth = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        const tourist = jwt.verify(token, process.env.JWT_SECRET)
        req.tourist = tourist
        next()
    } catch (error) {
        res.clearCookie("token")
    }
}

module.exports = { isAuth }