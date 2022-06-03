const express = require('express')
const route = express.Router()
const { isAuthRes } = require('../middlewares/isAuthRes')
const {getcontent, getcontentbyId, addcontent, deletecontent, updatecontent}=require('./../controllers/contentcontroller')

route.get('/',getcontent);

route.get('/:id',getcontentbyId);

route.post('/', /*isAuthRes,*/ addcontent);

route.delete('/:id', /*isAuthRes,*/ deletecontent);

route.patch('/:id', /*isAuthRes,*/ updatecontent);

module.exports = route