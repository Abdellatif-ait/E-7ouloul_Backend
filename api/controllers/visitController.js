const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getHandler(req, res) {
    //const {id}=req.tourist
    const id = req.params.id
    try {
        const visits = await prisma.visiter.findMany({
            where: {
                visiteurid: id
            }
        })
        const Lieux = [];
        for (let x of visits) {
            const lieu = await prisma.lieu.findUnique({
                where: {
                    id: x.placeid
                }
            })
            Lieux.push(lieu)
        }
        res.status(200).json({ status: 200, data: Lieux, message: "here's what i found" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function getVisistsHandler(req, res) {
    const id = req.params.id;
    try {
        const visists = await prisma.visiter.findMany({
            where: {
                placeid: id
            }
        })
        console.log(visists)
        const nb = visists.length;
        res.status(200).json({ status: 200, data: nb, message: "here's what we found" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function postHandler(req, res) {
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
        res.status(500).json({ status: 500, message: "something went wrong! try later" })

    }
}
async function deleteHandler(req, res) {
    //const {id}=req.tourist
    const { id, idLieu } = req.body
    try {
        const visite = await prisma.visiter.delete({
            where: {
                visiteurid: id,
                placeid: idLieu
            }
        })
        res.status(200).json({ status: 200, message: "deleted successfuly", data: visite })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })

    }
}

module.exports = { getHandler, getVisistsHandler, postHandler, deleteHandler }