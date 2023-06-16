const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/model')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
saltRounds = 10;
require('dotenv').config()
const middleware = require('./middleware')


router.use(cookieParser())


router.post('/login', async (req, res) => {
    try {
      // Get user data
      const email = req.body.email;
      const password = req.body.password;
  
      // Validate user data
      if (!(email && password)) {
        return res.status(400).send("All input fields are required");
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).send("Invalid credentials");
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send("Invalid credentials");
      }
  
      // Create JWT token
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      //saving the token in http-only cookie 
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,// 1 hour in milliseconds
      })


      if(token) {
        console.log("token created")
      }

  
      // Save user token
      user.token = token;

  
      // Return user and token
      res.json({ user, token });
      console.log("login", token);
    } catch (error) {
      console.log(error);
      return res.status(500).send("An error occurred");
    }
  })
  
  
  
  
  
  module.exports = router