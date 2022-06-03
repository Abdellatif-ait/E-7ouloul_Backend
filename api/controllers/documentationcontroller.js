const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getdocument(req, res) {
    const doc = await prisma.Documentation.findMany();
    res.status(200).json({ status: 200, data: doc })
}
async function getdocumentbyId(req, res) {
    const id = req.params.id;
    try {
        const doc = await prisma.Documentation.findMany({
            where: {
                lieuid:id
            }
        })
        res.status(200).json({ status: 200, data: doc })
    } catch (error) {
        res.status(500).json({ status: 500, message: "documentation n'existe pas !!" })
    }
}
async function adddocument(req, res) {
    const { url,lieuid } = req.body
    try {
        const document = await prisma.Documentation.findFirst({
            where: {
                docURL:url,
                lieuid:lieuid
            }
        })
        if (document) {
            return res.status(400).json({ status: 400, message: "documentation already exist!!" })
        }
        const doc = await prisma.Documentation.create({
            data: {
                docURL:url,
                lieuid:lieuid
            }
        })
        res.status(201).json({ status: 201, message: "Documentation added succesfully", data: doc })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function deletedocument(req, res) {
    const id = req.params.id;
    try {
        const place = await prisma.Documentation.findUnique({
            where: {
                id: id
            }
        })
        if (!place) {
            return res.status(500).json({ status: 500, message: "Documentation n'existe pas !!" })
        } else {
            const deletedocument = await prisma.Documentation.delete({
                where: {
                    id: id
                }
            })
            res.status(201).json({ status: 201, message: "Documentation deleted succesfully" })
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong try later" })
    }
}
async function updatedocumentation(req, res) {
    const { url } = req.body
    const { docId } = req.params.id
    try {

        const updatedocumentation = await prisma.Documentation.update({
            where: {
                id: docId
            },
            data: {
                docURL:url
            }
        })
        res.status(201).json({ status: 201, message: "Document updated succesfully" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong try later" })
    }
}

module.exports = { getdocument, getdocumentbyId, adddocument, deletedocument, updatedocumentation }