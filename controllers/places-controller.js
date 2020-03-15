const uuid = require("uuid/v4");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    ); // asychronous multiple thing at once
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  //const title = req.body.title
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };
  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)
  res.status(200).json({ place: createdPlace });
};

const upDatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const upDatePlace ={ ...DUMMY_PLACES.find(p=>p.id ===placeId)}; //...create copy spread operator
  const placeIndex = DUMMY_PLACES.findIndex(p=>p.id ===placeId);
  upDatePlace.title=title;
  upDatePlace.description= description;

  DUMMY_PLACES[placeIndex]=upDatePlace;

res,status(200).json({place:upDatePlace});
};

const deletePlace = (req, res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.upDatePlace = upDatePlace;
exports.deletePlace = deletePlace;
