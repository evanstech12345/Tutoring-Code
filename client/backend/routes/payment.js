const express = require('express');
const router = express.Router();
const User = require('../schema/model')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)



router.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',//replace with req.body.product
              },
              unit_amount: 2000,//replace with req.body.cost
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        // success_url: 'http://localhost:4242/success',
        // cancel_url: 'http://localhost:4242/cancel',
      });
})

module.exports = router;