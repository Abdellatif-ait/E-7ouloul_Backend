const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getHandler(_req,res){
    try {
        const events = await prisma.event.findMany()
        res.status(200).json({status:200,data:events,message:"Here's what we found"})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function getByIdHandler(req,res){
    const id= req.params.id;
    try {
        const events= await prisma.event.findMany({
            where:{
                lieuId:id
            }
        })
        res.status(200).json({status:200,data:events,message:"here's what we found"})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function postHandler(req,res){
    const {title,date,id}=req.body;
    try {
        const event= await prisma.event.findFirst({where:{
            title:title,
            date:date
        }})
        if(!event){
            const newEvent= await prisma.event.create({
                data:{
                    title:title,
                    date:date,
                    lieuId:id
                }
            })
            res.status(201).json({status:201,data:newEvent,message:"event created succcessfuly"})
        }
        res.status(400).json({status:400,message:"already exist"})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function deleteHandler(req,res){
    const id= req.params.id;
    try {
        const event= await prisma.event.delete({
            where:{
                id:id
            }
        })
        res.status(201).json({status:201,data:event,message:"Deleted successfuly"})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

module.exports={getHandler,getByIdHandler,postHandler,deleteHandler}