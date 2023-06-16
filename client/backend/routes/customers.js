const express = require("express");
const router = express.Router();
const User = require("../schema/model");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

//creating the customer


// const email = req.body.email;
router.post("/customer", async (req, res) => {
  try {

    
    const email = req.body.email;

    const customers = await stripe.customers.list({
      email,
      payment_method: "pm_card_visa",
      invoice_settings: {
        default_payment_method: "pm_card_visa",
      },
    });

    if (customers) {
      console.log("customers reached in the backend: " + email)
    } else {
      console.log("Customer is not reached in the backend")
    }

  } catch (error) {

    console.log("error creating customer" + error);
  }
});

module.exports = router;
