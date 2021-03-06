const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getcontent(req, res) {
    try {
        const content = await prisma.contenue.findMany();
        res.status(200).json({ status: 200, data: content })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong try later" })
    }

}

async function getcontentbyId(req, res) {
    const { id } = req.params.id
    try {
        const content = await prisma.contenue.findUnique({
            where: {
                idplace:id
            }
        })
        res.status(200).json({ status: 200, data: content })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong try later" })
    }
}

async function addcontent(req, res) {
    const { id,url, date , idplace } = req.body
    try {
        const content = await prisma.contenue.findFirst({
            where: {
                contentURL: url,
                addedat: date,                
            }
        })
        if (content) {
            res.status(400).json({ status: 400, message: "Content already exists !!" })
        } else {
            const contenue = await prisma.contenue.create({
                data: {
                    resid:id,
                    idplace:idplace,
                    contentURL: url,
                    addedat: date
                }
            })
            res.status(201).json({ status: 201, message: "content added succesfully", data: contenue })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

async function deletecontent(req, res) {
    const id = req.params.id
    try {
        const content = await prisma.contenue.findUnique({
            where: {
                idcontent: id
            }
        })
        if (!content) {
            res.status(500).json({ status: 500, message: "contenue n'existe pas !!" })
        } else {
            const contenue = await prisma.contenue.delete({
                where: {
                    idcontent: id
                }
            })
            res.status(201).json({ status: 201, message: "Content deleted succesfully" })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

async function updatecontent(req, res) {
    const id = req.params.id
    const { url, date } = req.body
    try {
        const content = await prisma.contenue.update({
            where: {
                idcontent: id
            },
            data: {
                contentURL: url,
                addedat: date
            }
        })
        res.status(201).json({ status: 201, message: "Content updated succesfully" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }

}

module.exports = { getcontent, getcontentbyId, addcontent, deletecontent, updatecontent }