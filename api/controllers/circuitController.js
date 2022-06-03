const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getHandler(_req,res){
    const circuits= await prisma.circuit.findMany()
    res.status(200).json({status:200,data:circuits,message:"here's what we found"})
}
async function getUserHandler(req,res){
    //const {id}=req.tourist
    const id=req.body.id
    try {
        const circuits=await prisma.circuit.findMany({where:{
            touristid:id
        }})
        res.status(200).json({status:200,data:circuits,message:"here's what we found"})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function postHandler(req,res){
    //const {id}=req.tourist
    const {id,content}=req.body
    try {
        const circuit=await prisma.circuit.create({
            data:{
                touristid:id
            }
        })
        for(let x of content){
            console.log(x)
            await prisma.circuitContent.create({
                data:{
                    circuitId:circuit.id,
                    lieuId:x.id,
                    position:x.position
                }
            })
        }
        res.status(201).json({status:201,data:circuit,message:"added successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

async function deleteHandler(req,res){
    const{id}=req.params
    try {
        const circuit=await prisma.circuit.delete({where:{
            id:id
        }})
        res.status(201).json({status:201,data:circuit,message:"deleted successfully"})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })      
    }
}

module.exports={getHandler,getUserHandler,postHandler,deleteHandler}