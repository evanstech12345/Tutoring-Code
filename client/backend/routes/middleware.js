//!this is giving me problems with the 401 authentication error for payment
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/model')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');
const session = require('express-session');



require('dotenv').config()


router.use(cookieParser());

const verifyToken = async (req, res, next) => {


  const csrfToken = req.headers['x-csrf-token'];
  const sessionToken = req.headers['x-session-token'];
  console.log("Tokens from the headers: ", csrfToken, sessionToken);

  //getting the user session from mongodb
  const url = process.env.MONGO_URL

  // let userSessionArray = null;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( async () => {
    console.log("Connected to database");
    
    // You can now use the mongoose.connection object to access the database
    const db = mongoose.connection;
    
    // Perform your database operations using the connected db object
    const userSessionCurser = await db.collection('sessions').find({ "session.csrfToken": csrfToken, "session.sessionToken": sessionToken })//this is a cursor it can't get actuall data
    const userSessionArray = await userSessionCurser.toArray(); //this will read the data

    // userSessionArray.push(...userSessionFetched)
    console.log("session collection from the db: ", userSessionArray);

    if(userSessionArray.length !== 0) {
      console.log("Authentication successful");
      next();
    } else {
      console.log("authentication failed")
      res.status(401).send('Unauthorized')
    }



  })
  .catch(err => {
    console.error("Error connecting to database:", err);
  });
  

  





  
  };
  
  module.exports = verifyToken;
  

