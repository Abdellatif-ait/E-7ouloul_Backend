const express = require('express')
const route = express.Router()
const { isAuthRes } = require('../middlewares/isAuthRes')
const { getannonce, getannoncebyId, addannonce, deleteannonce, updateannonce } = require('./../controllers/annocecontroller')

route.get('/', getannonce);

route.get('/:idannonce', getannoncebyId);

route.post('/',  /*isAuthRes,*/ addannonce);

route.delete('/:idannonce',  /*isAuthRes,*/ deleteannonce);

route.patch('/:idannonce', /*isAuthRes,*/ updateannonce);

module.exports = route