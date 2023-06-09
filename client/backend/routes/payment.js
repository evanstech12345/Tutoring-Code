const express = require('express');
const router = express.Router();
const User = require('../schema/model')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)



module.exports = router;