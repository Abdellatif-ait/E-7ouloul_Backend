const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getplace (req, res){
    const place = await prisma.lieu.findMany();
    res.status(200).json({status : 200, data: lieu})
}
async function getplacebyId (req,res){
    const id = req.params.id;
    try {
        const place = await prisma.lieu.findUnique({
            where:{
                id:id
            }
        })
        res.status(200).json({status : 200, data : lieu})
    } catch (error) {
        res.status(500).json({status : 500, message :"Lieu n'existe pas !!" })
    }
}
async function createplace (req,res){
    const {name, timebeg, timeend } = req.body
    try {
        const place = await prisma.lieu.findfirst({
            where:{
                name:name,
                accesstimebeg:timebeg,
                accesstimeend:timeend
            }
        })
        if (place){
            return res.status(400).json({ status: 400, message: "Place already exist!!" })
        }
        const lieu = await prisma.lieu.create({
            data:{
                name:name,
                accesstimebeg:timebeg,
                accesstimeend:timeend
            }
        })
        res.status(201).json({status : 201,message:"Place added succesfully",data:lieu})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function deleteplace (req,res){
    const id = req.params.id;
    try {
            const place = await prisma.lieu.findUnique({
                where: {
                    id:id
                }
            })
            if (!place) {
                return res.status(500).json({ status: 500, message: "Lieu n'existe pas !!" })
            }else{
                const deleteplace = await prisma.lieu.delete({
                    where:{
                        id:id 
                    }
                })
                res.status(201).json({ status: 201, message: "Place deleted succesfully" })
            }
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong try later" })
    } 
}
async function updateplace (req,res){
    const { name, timebeg, timeend } = req.body
    const {placeId} = req.params.id
    try {

            const updateplace = await prisma.lieu.update({
                where: {
                    id:placeId
                },
                data:{
                    name: name,
                    accesstimebeg: timebeg,
                    accesstimeend: timeend
                }
            })
            res.status(201).json({ status: 201, message: "Place updated succesfully" })
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong try later" })
    }
}

module.exports ={getplace, getplacebyId, createplace, deleteplace, updateplace}