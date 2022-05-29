const express = require('express')
const { getHandler, registerHandler, getByIdHandler, loginHandler, followHandler, postHandler ,visiteHandler,visiteDeleteHandler} = require('../controllers/touristController')
const { isAuth } = require('../middlewares/isAuth')
const route = express.Router()

route.post('/login', loginHandler)
route.post('/register', registerHandler)
route.get('/', getHandler)
route.get('/:id', getByIdHandler)
route.post('/follow',/*isAuth,*/ followHandler)
route.post('/post', postHandler)
route.post('/visiter',visiteHandler)
route.delete('/visiter',visiteDeleteHandler)

module.exports = route