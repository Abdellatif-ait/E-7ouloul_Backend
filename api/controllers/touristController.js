const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

async function getHandler(_req, res) {
    try {
        const tourist = await prisma.tourist.findMany();
        res.status(200).json({ status: 200, data: tourist });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function getByIdHandler(req, res) {
    const id = req.params.id;
    try {
        const tourist = await prisma.tourist.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json({ status: 200, data: tourist })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function registerHandler(req, res) {
    const { email, password, username, nom, prenom, phoneNum } = req.body
    try {
        const account = await prisma.tourist.findFirst({
            where: {
                email: email,
                username: username
            }
        })
        if (account) {
            return res.status(400).json({ status: 400, message: "Account already exist!!" })
        }
        const newPassword = await bcrypt.hash(password, 10)
        const tourist = await prisma.tourist.create({
            data: {
                email: email,
                username: username,
                password: newPassword,
                nom: nom,
                prenom: prenom,
                phoneNum: phoneNum
            }
        })
        res.status(201).json({ status: 201, data: tourist, message: "account created successfuly" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function loginHandler(req, res) {
    const { email, password } = req.body
    try {
        const account = await prisma.tourist.findFirst({
            where: {
                email: {
                    equals: email
                }
            }
        })
        if (account && (await bcrypt.compare(password, account.password))) {
            res.status(200).cookie("token", generateToken(account.id), { httpOnly: true }).json({ status: 200, message: "welcome back!" })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function followHandler(req, res) {
    //const followerid= req.tourist.id
    const { followerid, followingid } = req.body
    try {
        const followers = await prisma.abonne.create({
            data: {
                aboneeid: followingid,
                abonnementsid: followerid
            }
        })
        res.status(201).json({ status: 201, data: followers, message: "followed successefuly" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function deleteFollowHandler(req, res) {
    //const {id}=req.tourist
    const { followerid, followingid } = req.body
    try {
        const follow = await prisma.abonne.delete({
            where: {
                aboneeid: followingid,
                abonnementsid: followerid
            }
        })
        res.status(200).json({ status: 200, data: follow, message: "deleted successfully" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}

module.exports = { getHandler, getByIdHandler, registerHandler, loginHandler, followHandler, deleteFollowHandler }