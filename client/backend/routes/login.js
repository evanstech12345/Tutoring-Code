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
      const accessToken = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }
      );
      //creating refresh token
      const refreshToken = jwt.sign(
        { email },
        process.env.REFRESH_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_LIFE,
        }
      );

      //saving the token in http-only cookie 
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,// 1 hour in milliseconds
      })


      if(accessToken) {
        console.log("access token created", accessToken);

      }

  
      // Save user token
      user.token = { accessToken, refreshToken }

  
      // Return user and token
      return res.json({ user, accessToken, refreshToken });
      console.log("login accesstoken, refreshToken", accessToken, refreshToken);
    } catch (error) {
      console.log(error);
      return res.status(500).send("An error occurred");
    }
  })

  
  
  
  
  
  module.exports = router