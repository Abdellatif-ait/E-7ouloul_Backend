const express = require('express')
const route= express.Router()
const { isAuth } = require('../middlewares/isAuth')
const {getHandler,getUserHandler,postHandler,deleteHandler}= require('../controllers/circuitController')

route.get('/',getHandler)
route.get('/:id',getUserHandler)
route.post('/',postHandler)
route.delete('/:id',deleteHandler)

module.exports= route