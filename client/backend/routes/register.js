const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/model')
const jwt = require('jsonwebtoken');
saltRounds = 10;
require('dotenv').config()


router.post('/register', async (req, res) => {
  try {
    //get user data
    const email = req.body.email;
    const password = req.body.password;

    //validate user data
    if(!(email && password)) {
      res.status(400).send("all input fields are required")
    }
    //check if user exists
    const oldUser = await User.findOne({ email });

    if(oldUser) {
      res.status(409).send("user already exists")
    }

    //hash password
    encryptedUserPassword = await bcrypt.hash(password, saltRounds);
    //create new user in the db
    const user = await User.create({
      email,
      password: encryptedUserPassword
    });


    //storing user data in session
    const createSessionData = (user) => ({
      _id: user._id,
      email: email,
    });
    
    const sessionData = createSessionData(user)

    if(sessionData) {
      console.log("Session created in the register")
      req.session.user = sessionData;
    } else {
      console.log("Session not created in the register backend")
    }
    //return new user
    res.status(201).json(user);
    // console.log("register access token: " + accessToken + "refresh token: " + refreshToken);
    console.log("register session info: ", createSessionData)

  } catch (error) {
    console.log(error);
  }
})

module.exports = router