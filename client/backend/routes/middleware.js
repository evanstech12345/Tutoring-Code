//!this is giving me problems with the 401 authentication error for payment
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/model')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config()





//this is used so that only authenticated users with the right token can access



const verifyToken = (req, res, next) => {
  //.split removes Beaerer and the spaces in the token string
    const token = req.headers['authorization'].trim().split(' ')[1];
    console.log("Token: ", token);
    // console.log("Body: " + req.body.token + "query: " + req.query + "Headers: " + req.headers)//! this is showing undefined
  
    if (!token) {
      return res.status(403).send("A token is required");
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("Invalid token, this is the error message:" + err);
    }
  };
  
  module.exports = verifyToken;
  