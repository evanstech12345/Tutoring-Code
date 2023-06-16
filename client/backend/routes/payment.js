const express = require('express');
const router = express.Router();
const User = require('../schema/model')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// const verifyTokenMiddleware = require('./middleware')
const stripe = require('stripe')(process.env.STRIPE_KEY)
const middleware = require('./middleware')

//! make a store items function with .map()

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "scratch fun"}],
  [2, {priceInCents: 10000, name: "web dev ninja"}]
])

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};




router.post("/create-checkout-session", middleware, async (req, res) => {



  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

})

module.exports = router;