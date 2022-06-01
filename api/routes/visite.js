const express =require('express')
const route= express.Router()
const { isAuth } = require('../middlewares/isAuth')
const { getHandler,postHandler,deleteHandler}=require('../controllers/visitController')

route.get('/:id',getHandler)
route.post('/',postHandler)
route.delete('/:id',deleteHandler)

module.exports= route