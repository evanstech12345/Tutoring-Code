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

//! make a store items function with .map()

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "scratch fun" }],
  [2, { priceInCents: 10000, name: "web dev ninja" }]
]);


router.post("/create-checkout-session", middleware, async (req, res) => {

  //sending the header with the post request
  const scratchFun = req.body.scratchFun;
  const javascriptPro = req.body.javascriptPro;
  const pythonPro = req.body.pythonPro;
  const webDevNinja = req.body.WebDevNinja;

  


  // const email = req.body.email;//!change to real email address

  const price = await stripe.prices.create({
    unit_amount: 5000, // The price in cents
    currency: 'usd',
    product_data: {
      name: `${scratchFun}`,
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
      // customer_email: {
      //   email,
      // },
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




