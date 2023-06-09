const express = require('express');
const router = express.Router();
const User = require('../schema/model')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

//creating the customer for stripe subscription
const customer = await stripe.customers.create({
    email: '',
    shipping:{
        address: {
            city: '',
            country: '',
            line1: '',
            postal_code: '',
            state: '',

        },
    }
})










module.exports = router
