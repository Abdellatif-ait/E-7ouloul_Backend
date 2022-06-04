const express = require('express')
const route= express.Router();
const {getHandler,getByIdHandler,postHandler,deleteHandler}= require('../controllers/eventController')

route.get('/',getHandler)
route.get('/:id',getByIdHandler)
route.post('/',postHandler)
route.delete('/:id',deleteHandler)

module.exports=route