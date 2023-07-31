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
  router.use(cookieParser());



const verifyToken = async (req, res, next) => {
  //.split removes Beaerer and the spaces in the token string

  









  let token;
  let refreshToken;

    if (req.headers['authorization']) {
      token = req.headers['authorization'].trim().split(' ')[1];
      console.log("token from middleware: " + token);
    } else {
      console.log('token header is missing')
    }
    console.log("Token: ", token);
    // console.log("Body: " + req.body.token + "query: " + req.query + "Headers: " + req.headers)//! this is showing undefined
  

    //checking if the refresh token exists 
    if(req.cookies && req.cookies.refreshToken) {
      refreshToken = req.cookies.refreshToken
      console.log("refresh token exists:", refreshToken )
    } else {
      console.log("refresh token doesnt exist")
    }


    if (!token && !refreshToken) {
      return res.status(401).send("Unauthorized");
    }
  
    try {

      if(token) {
        try{

        const decodedAccess = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded access:", decodedAccess)
        req.user = decodedAccess;
        return next();
        } catch (error){
          console.log("error with decoding the access token: " + error)
        }
      }

      if (refreshToken) {
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
          console.log("decoded Refresh: ", decodedRefresh);
      
          // Making a new access token using the email from the refresh token decode.
          const newAccessToken = jwt.sign(
            { email: decodedRefresh.email },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.ACCESS_TOKEN_LIFE,
            }
          );
      
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 120000, // Convert seconds to milliseconds
          });
      
          // Continue with the request
          req.user = jwt.verify(newAccessToken, process.env.JWT_SECRET);
          return next();
        } catch (err) {
          // If refresh token verification also fails, the tokens are invalid.
          return res.status(401).send("Invalid tokens, this is the error message: " + err);
        }
      }
      
      
      

      // if(refreshToken) {
      //   const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
      //   console.log("decoded Refresh: ", decodedRefresh)
      //   //making a new access token and obtaining the email from the refresh token decode 
      //   const newAccessToken = jwt.sign( //access token that will be used in refresh 
      //   { email: decodedRefresh.email },
      //   process.env.JWT_SECRET,
      //   {
      //     expiresIn: process.env.ACCESS_TOKEN_LIFE,
      //   },
      //   console.log("New Access Token Created: ", newAccessToken, "refresh token decoded: ", decodedRefresh)
      // );
      // res.cookie("accessToken", newAccessToken, {
      //   httpOnly: true,
      //   secure: false,
      //   maxAge: 120000, // Convert seconds to milliseconds
      // });

      // // Continue with the request
      // req.user = jwt.verify(newAccessToken, process.env.JWT_SECRET);
      // return next();
      // }


      // let decoded;
      // if(res.status === 401){//!I have to find out how to get the status of the frontend response
        
      //   decoded = jwt.verify(newAccessToken, process.env.REFRESH_SECRET)
      //   console.log("decoded refresh secret, making new access token: ", JSON.stringify(decoded), "This is the refresh token: ", token)
      // } 
      // else {
      //   decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log("decoded access secret: ", JSON.stringify(decoded), "This is the access token: ", token)
      // }
    } catch (err) {
      return res.status(401).send("Invalid token, this is the error message:" + err);
    }
  };
  
  module.exports = verifyToken;
  