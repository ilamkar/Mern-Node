const express = require('express');

const placesController = require('../controllers/places-controller');


const router = express.Router();



router.get('/:pid', placesController.getPlaceById)
router.get('/user/:uid',placesController.getPlaceByUserId); // register route get (path, req,res,next) from controller
  
router.post('',placesController.createPlace);

router.patch('/:pid',placesController.upDatePlace); //only interesed in patch method
router.delete('/:poid',placesController.deletePlace);

module.exports = router;