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

    //creating the jwt token
    const accessToken = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      }
    )
     //creating refresh token
     const refreshToken = jwt.sign(
      { email },
      process.env.REFRESH_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
      }
    );

    //saveing user token 
    user.token = accessToken, refreshToken;

    //return new user
    res.status(201).json(user);
    console.log("register access token: " + accessToken + "refresh token: " + refreshToken);


  } catch (error) {
    console.log(error);
  }
})

module.exports = router