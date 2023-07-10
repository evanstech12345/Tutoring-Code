const express = require('express');
const router = express.Router();
const User = require('../schema/model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// const verifyTokenMiddleware = require('./middleware');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const middleware = require('./middleware');
const cors = require('cors');
const axios = require('axios');

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "scratch fun" }],
    [2, { priceInCents: 10000, name: "web dev ninja" }]
  ]);
  
  
  router.post("/create-checkout-session", middleware, async (req, res) => {
  
    //getting the clicked element
    const elementClicked = req.body.elementClicked;
  
    const price = await stripe.prices.create({
      unit_amount: 3000, // The price in cents
      currency: 'usd',
      product_data: {
        name: `${elementClicked}`,
      },
    });
    
    const priceId = price.id;
    console.log(priceId);
    
  
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: `${priceId}`, // Replace with the Price ID
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.SUCCESSURL}?success=true`, // if successful payment
        cancel_url: `${process.env.FAILURL}?canceled=true`, // if payment is a failure
      });
  
      return res.status(200).json(session.url)
      return res.setHeader('Access-Control-Allow-Origin', '*');
      // return res.json({ sessionId: session.id });
    } catch (error) {
      console.log("error with payment checkout session: ", error);
    }
  });
  
  module.exports = router;
  
  
  
  
  










module.exports = router
