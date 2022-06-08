const express = require('express')
const route = express.Router()
const { isAuth } = require('../middlewares/isAuth')
const { getHandler, getVisistsHandler, postHandler, deleteHandler } = require('../controllers/visitController')

route.get('/:id', getHandler)
route.get('/lieu/:id', getVisistsHandler)
route.post('/', postHandler)
route.delete('/:id', deleteHandler)

module.exports = route