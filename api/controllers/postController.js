const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAllHandler(req,res){
    const posts= await prisma.post.findMany()
    res.status(200).json({status:200,data:posts,message:"here's what we found"})
}
async function getUserHandler(req,res){
    //const {id}=req.tourist;
    const id=req.params.id
    try {
        const posts= await prisma.post.findMany({where:{
            touristid:id
        }})
        res.status(200).json({status:200,data:posts,message:"here's what we found "})
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try lated" })
    }
}
async function postHandler(req, res) {
    //const {id}=req.tourist
    const { id, description ,mediaURL} = req.body
    try {
        const post = await prisma.post.create({
            data: {
                description: description,
                touristid: id,
                mediaURL:mediaURL
            }
        })
        res.status(200).json({ status: 201, data: post, message: "posted successfuly" })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}
async function deleteHandler(req,res){
    const id= req.params.id
    try {
        const post= await prisma.post.delete({where:{
            id:id
        }})
        res.status(201).json({ status: 201, data: post, message: "deleted successfuly" })
    } catch (error) {
        res.status(500).json({ status: 500, message: "something went wrong! try later" })
    }
}

module.exports={getAllHandler,getUserHandler,postHandler,deleteHandler}