const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getannonce(req, res) {
    const annonce = await prisma.annonce.findmany();
    res.status(200).json({ status: 200, data: annonce })
}

async function getannoncebyId(req, res) {
    const { adid } = req.params.id
    try {
        const annonce = await prisma.annonce.findunique({
            where: {
                idannonce: adid
            }
        })
        res.status(200).json({ status: 200, data: annonce })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong try later" })
    }
}

async function addannonce(req, res) {
    const { content, date } = req.body
    try {
        const annonce = await prisma.annonce.findfirst({
            where: {
                contenue: content,
                addedat: date
            }
        })
        if (annonce) {
            res.status(400).json({ status: 400, message: "annonce already exists !!" })
        } else {
            const ad = await prisma.annonce.create({
                data: {
                    contenue: content,
                    addedat: date
                }
            })
            res.status(201).json({ status: 201, message: "annonce added succesfully", data: ad })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

async function deleteannoce(req, res) {
    const id = req.params.id
    try {
        const annonce = await prisma.annonce.findunique({
            where: {
                idannonce: id
            }
        })
        if (!annonce) {
            res.status(500).json({ status: 500, message: "annonce n'existe pas !!" })
        } else {
            const ad = await prisma.annonce.delete({
                where: {
                    idannonce: id
                }
            })
            res.status(201).json({ status: 201, message: "annonce deleted succesfully" })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

async function updateannonce(req, res) {
    const id = req.params.id
    const { content, date } = req.body
    try {
        const annonce = await prisma.annonce.update({
            where: {
                idannonce: id
            },
            data: {
                contenue: content,
                addedat: date
            }
        })
        res.status(201).json({ status: 201, message: "annonce updated succesfully" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }

}

module.exports = { getannonce, getannoncebyId, addannonce, deleteannoce, updateannonce }