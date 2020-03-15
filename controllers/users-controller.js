const uuid = require("uuid/v4");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Ilam Karmacharya",
    email: "test@test.com",
    password: "test"
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const createdUser = { // \response paramater
    id: uuid(),
    name,  //name:name
    email,
    password
  };

DUMMY_USERS.push(createdUser);

res.status(201).json({user:createdUser});


};

const login = (req, res, next) => {

const {email,password} = req.body;

const identifiedUser = DUMMY_USERS.find(u=>u.email===email);
if(!identifiedUser || identifiedUser.password !==password){
    throw new HttpError('Could not find user',401)
}

res.json({message:'Logged in '});
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
