const express = require('express')
const route = express.Router()

const {getcontent, getcontentbyId, addcontent, deletecontent, updatecontent}=require('./../controllers/contentcontroller')

route.get('/',getcontent);

route.get('/:idcontent',getcontentbyId);

route.post('/',addcontent);

route.delete('/:idcontent',deletecontent);

route.patch('/:idcontent',updatecontent);

module.exports = route