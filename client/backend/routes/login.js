const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/model')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
saltRounds = 10;
require('dotenv').config()
const middleware = require('./middleware')
const crypto = require('crypto')


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

      //Generating CRSF Tokens when the user Logs in
      const csrfToken = crypto.randomUUID()//help protect against CSRF attacks
      const sessionToken = crypto.randomUUID() //used to maintain a users session


      const createSessionData = (user, csrfToken, sessionToken) => ({
        _id: user._id,
        email: user.email,
        csrfToken, //adding csrf token to the object  
        sessionToken,

      })

      
      const sessionData = createSessionData(user, csrfToken, sessionToken);

      if(sessionData) {
        console.log("Session created in the Login")
        req.session.user = sessionData;//saving the session
        req.session.csrfToken = csrfToken;//If you ever want to save something to the session use req.session[variable]
        req.session.sessionToken = sessionToken;
        console.log(`saved csrf token ${csrfToken}, Authed by ${email}, saved session token ${sessionToken}`)
      } else {
        console.log("Session not created in the Login backend")
      }
      
      const responseToken = {
        csrfToken: csrfToken,
        sessionToken: sessionToken,
        sessionData: sessionData,
        message: `Authed by ${email}`
      }


      // Return token
      return res.json(responseToken);//you have to return a json response object
    } catch (error) {
      console.log(error);
      return res.status(500).send("An error occurred");
    }
  })

  
  
  
  
  
  module.exports = router



































        // const accessToken = jwt.sign(
      //   { email },
      //   process.env.JWT_SECRET,
      //   {
      //     expiresIn: process.env.ACCESS_TOKEN_LIFE,
      //   }
      // );
      // //creating refresh token
      // const refreshToken = jwt.sign(
      //   { email },
      //   process.env.REFRESH_SECRET,
      //   {
      //     expiresIn: process.env.REFRESH_TOKEN_LIFE,
      //   }
      // );

      // //saving the token in http-only cookie 
      // const cookieHttpOption = {
      //   httpOnly: true,
      //   secure: false,
      //   maxAge: 2592000000,
      //   domain: "localhost"
      // }


      // res.cookie("accessToken", accessToken, cookieHttpOption);
      // res.cookie("refreshToken", refreshToken, cookieHttpOption);
 

      // if(accessToken) {
      //   console.log("access token created", accessToken);

      // }

      // if(refreshToken) {
      //   console.log("refresh token created", refreshToken);
      // }

  
      // Save user token
      // user.token = { accessToken, refreshToken }

      // console.log("login accesstoken, refreshToken", accessToken, refreshToken);