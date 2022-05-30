const express = require('express')
const { getHandler, registerHandler, getByIdHandler, loginHandler } = require('../controllers/responsablecontroller')
const route = express.Router()

route.post('/login', loginHandler)
route.post('/register', registerHandler)
route.get('/', getHandler)
route.get('/:id', getByIdHandler)

module.exports = route