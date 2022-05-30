const express = require('express')
const route = express.Router()
const { isAuthRes } = require('../middlewares/isAuthRes')
const { getplace, getplacebyId, createplace, deleteplace, updateplace }=require('../controllers/lieucontroller')
route.get('/', getplace );

route.get('/:Idlieu', getplacebyId);

route.post('/', /*isAuthRes,*/ createplace);

route.delete('/:Idlieu',  /*isAuthRes,*/ deleteplace);

route.patch('/:Idlieu',  /*isAuthRes,*/ updateplace);

module.exports = route