const express = require('express')
const route = express.Router()
const { isAuthRes } = require('../middlewares/isAuthRes')
const {getcontent, getcontentbyId, addcontent, deletecontent, updatecontent}=require('./../controllers/contentcontroller')

route.get('/',getcontent);

route.get('/:idcontent',getcontentbyId);

route.post('/', /*isAuthRes,*/ addcontent);

route.delete('/:idcontent', /*isAuthRes,*/ deletecontent);

route.patch('/:idcontent', /*isAuthRes,*/ updatecontent);

module.exports = route