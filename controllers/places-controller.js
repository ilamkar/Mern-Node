const uuid = require("uuid/v4");

const {validationResult}= require('express-validator');

const HttpError = require("../models/http-error");
const getCoordsForAddress= require('../util/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1"
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1"
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    //  const error = new Error('Could not find a place for the provided id');
    //  error.code = 404;
    throw new HttpError("Could not find a place for the provided id", 404); // synchrous only one thing at a time
  }
  res.json({ place }); // => { place } => { place: place }
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter(p => { // fill return a new array full of elements find only find first elements that maches the crieteria
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id", 404)
    ); // asychronous multiple thing at once
  }
  res.json({ places});
};
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description, address, creator } = req.body; // coordinates no longer need in request

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  // const title = req.body.title; this is for response 
  // const createdPlace = {
  //   id: uuid(),
  //   title,
  //   description,
  //   location: coordinates,
  //   address,
  //   creator
  // };

  //create a new model
  const createdPlace = new Place({
    title,
    description,
    address,
    location:coordinates,
    image:'',
    creator
  });

 //DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)
try{
  await createPlace.save();//is a promise. aschronous task

}catch(err){
 const error = new HttpError('Creting place failed, please try again',500);
 console.log('fail');
 return next(error);
}

  res.status(201).json({ place: createdPlace });
};


const updatePlace = (req, res, next) => {
  if(!errors.isEmpty()){
    console.log(errors);
    throw new HttpError('Invalid input passed, please check your data',422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if(!DUMMY_PLACES.find(p=>p.id===placeId)){
    throw new HttpError('Could not find placefor that id',404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
