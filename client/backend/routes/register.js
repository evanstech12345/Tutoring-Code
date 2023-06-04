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
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )

    //saveing user token 
    user.token = token;

    //return new user
    res.status(201).json(user);
    console.log(token);


  } catch (error) {
    console.log(error);
  }
})


router.post('/login', async (req, res) => {
  try {
    // Get user data
    const { email, password } = req.body;

    // Validate user data
    if (!(email && password)) {
      res.status(400).send("All input fields are required");
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send("Invalid credentials");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send("Invalid credentials");
    }

    // Create JWT token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Save user token
    user.token = token;

    // Return user and token
    res.status(200).json({ user, token });
    console.log(token);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
})




module.exports = router