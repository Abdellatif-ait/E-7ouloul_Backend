const express = require('express')
const route = express.Router()

const { getplace, getplacebyId, createplace, deleteplace, updateplace }=require('../controllers/lieucontroller')
route.get('/', getplace );

route.get('/:Idlieu', getplacebyId);

route.post('/', createplace);

route.delete('/:Idlieu', deleteplace);

route.patch('/:Idlieu', updateplace);

module.exports = route