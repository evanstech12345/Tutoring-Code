const express = require("express");
const router = express.Router();
const User = require("../schema/model");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

//creating the customer

// const email = req.body.email;
const getCustomers = async (req, res) => {
  try {
    const customers = await stripe.customers.list({
      email: req.body.email,
      payment_method: "pm_card_visa",
      invoice_settings: {
        default_payment_method: "pm_card_visa",
      },
    });
   
    console.log("customer created: " + email)

  } catch (error) {
    console.log("error creating customer" + error);
  }
};

module.exports = router;
