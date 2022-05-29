const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const prisma = new PrismaClient()

async function getHandler(_req, res) {
    const tourist = await prisma.tourist.findMany();
    res.status(200).json({ status: 200, data: tourist });
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
        console.log(error.message)
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function registerHandler(req, res) {
    const { email, password, username, nom, prenom, phoneNum } = req.body
    try {
        const account = await prisma.tourist.findFirst({
            where: {
                email: email
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
        console.log(error.message)
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
        console.log(error.message)

        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function postHandler(req, res) {
    //const {id}=req.tourist
    const { id, description } = req.body
    try {
        const post = await prisma.post.create({
            data: {
                description: description,
                touristid: id
            }
        })
        res.status(200).json({ status: 201, data: post, message: "posted successfuly" })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function visiteHandler(req, res) {
    //const {id}=req.tourist
    const { id, idLieu } = req.body
    try {
        const visite = await prisma.visiter.create({
            data: {
                visiteurid: id,
                placeid: idLieu
            }
        })
        res.status(201).json({ status: 201, data: visite, message: "visite has been added successfuly" })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({ status: 500, message: "something went wrong! try later" })

    }
}
async function visiteDeleteHandler(req, res) {
    //const {id}=req.tourist
    const { id, idLieu } = req.body
    try {
        const visite =await prisma.visiter.delete({
            where: {
                visiteurid: id,
                placeid: idLieu
            }
        })
        res.status(200).json({ status: 200, message: "deleted successfuly", data: visite })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 500, message: "something went wrong! try later" })

    }
}

module.exports = { getHandler, getByIdHandler, registerHandler, loginHandler, followHandler, postHandler, visiteHandler, visiteDeleteHandler }