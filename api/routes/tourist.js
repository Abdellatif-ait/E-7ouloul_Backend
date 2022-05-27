const express=require('express')
const route= express.Router()

route.post('/login',loginHandler)
route.post('/register',registerHandler)
route.get('/',getHandler)
route.get('/:id',getByIdHandler)

module.exports=route