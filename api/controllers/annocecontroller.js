const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getannonce(req, res) {
    const annonce = await prisma.annonce.findMany();
    res.status(200).json({ status: 200, data: annonce })
}

async function getannoncebyId(req, res) {
    const adid  = req.params.id
    try {
        const annonce = await prisma.annonce.findUnique({
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
    const { id,content, date } = req.body
    try {
        const annonce = await prisma.annonce.findFirst({
            where: {
                contenue: content,
                Addedat: date
            }
        })
        if (annonce) {
            res.status(400).json({ status: 400, message: "annonce already exists !!" })
        } else {
            const ad = await prisma.annonce.create({
                data: {
                    idres:id,
                    contenue: content,
                    Addedat: date
                }
            })
            res.status(201).json({ status: 201, message: "annonce added succesfully", data: ad })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

async function deleteannonce(req, res) {
    const id = req.params.id
    try {
        const annonce = await prisma.annonce.findUnique({
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
                Addedat: date
            }
        })
        res.status(201).json({ status: 201,data:annonce, message: "annonce updated succesfully" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }

}

module.exports = { getannonce, getannoncebyId, addannonce, deleteannonce, updateannonce }