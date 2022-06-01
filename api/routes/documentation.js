const express = require('express')
const route = express.Router()
const { isAuthRes } = require('../middlewares/isAuthRes')
const { getdocument, getdocumentbyId, adddocument, deletedocument, updatedocumentation } = require('./../controllers/documentationcontroller')

route.get('/', getdocument);

route.get('/:id', getdocumentbyId);

route.post('/',  /*isAuthRes,*/ adddocument);

route.delete('/:id',  /*isAuthRes,*/ deletedocument);

route.patch('/:id', /*isAuthRes,*/ updatedocumentation);

module.exports = route