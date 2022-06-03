const express = require('express')
const route = express.Router()
const { isAuthRes } = require('../middlewares/isAuthRes')
const { getplace, getplacebyId, createplace, deleteplace, updateplace }=require('../controllers/lieucontroller')
route.get('/', getplace );

route.get('/:id', getplacebyId);

route.post('/', /*isAuthRes,*/ createplace);

route.delete('/:id',  /*isAuthRes,*/ deleteplace);

route.patch('/:id',  /*isAuthRes,*/ updateplace);

module.exports = route