const express = require('express')
const route = express.Router()
const { isAuthRes } = require('../middlewares/isAuthRes')
const { getannonce, getannoncebyId, addannonce, deleteannonce, updateannonce } = require('./../controllers/annocecontroller')

route.get('/', getannonce);

route.get('/:id', getannoncebyId);

route.post('/',  /*isAuthRes,*/ addannonce);

route.delete('/:id',  /*isAuthRes,*/ deleteannonce);

route.patch('/:id', /*isAuthRes,*/ updateannonce);

module.exports = route