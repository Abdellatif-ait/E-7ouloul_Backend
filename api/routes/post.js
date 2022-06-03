const express = require('express')
const route = express.Router()
const { isAuth } = require('../middlewares/isAuth')
const { getAllHandler, getUserHandler, postHandler, deleteHandler } = require('../controllers/postController')

route.get('/', getAllHandler)
route.get('/:id', getUserHandler)
route.post('/', postHandler)
route.delete('/:id', deleteHandler)

module.exports = route