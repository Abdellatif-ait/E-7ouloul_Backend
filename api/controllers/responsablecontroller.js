const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const prisma = new PrismaClient()

async function getHandler(_req, res) {
    try {
        const responsable = await prisma.responsable.findMany();
        res.status(200).json({ status: 200, data: responsable });
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function getByIdHandler(req, res) {
    const id = req.params.id;
    try {
        const responsable = await prisma.responsable.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json({ status: 200, data: responsable })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function registerHandler(req, res) {
    const { email, password, username } = req.body
    try {
        const account = await prisma.responsable.findFirst({
            where: {
                email: email,
                username: username
            }
        })
        if (account) {
            return res.status(400).json({ status: 400, message: "Account already exist!!" })
        }
        const newPassword = await bcrypt.hash(password, 10)
        const responsable = await prisma.responsable.create({
            data: {
                email: email,
                username: username,
                password: newPassword,
            }
        })
        res.status(201).json({ status: 201, data: responsable, message: "account created successfuly" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function loginHandler(req, res) {
    const { email, password } = req.body
    try {
        const account = await prisma.responsable.findFirst({
            where: {
                email: email
            }
        })
        if (account && (await bcrypt.compare(password, account.password))) {
            res.status(200).cookie("token", generateToken(account.id), { httpOnly: true }).json({ status: 200, message: "welcome back!" })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}


module.exports = { getHandler, getByIdHandler, registerHandler, loginHandler }
