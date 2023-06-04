const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/model')
const jwt = require('jsonwebtoken');
saltRounds = 10;
require('dotenv').config()



router.post('/login', async (req, res) => {
    try {
      // Get user data
      const email = req.body.email;
      const password = req.body.password;
  
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
        { email: req.body.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
  
      // Save user token
      user.token = token;
  
      // Return user and token
      res.status(200).json({ user, token });
      console.log("login", token);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    }
  })
  
  
  
  
  
  module.exports = router