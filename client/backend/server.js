const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const authRegister = require('./routes/register');
const authLogin = require('./routes/login');
const authMiddleware = require("./routes/middleware")
const payment = require('./routes/payment');
const subscription = require('./routes/subcription');
const customer = require('./routes/customers');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()





// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())


//cors middleware

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with the origin of your frontend
    // 'Access-Control-Allow-Origin': 'https://checkout.stripe.com/c/pay/cs_test_a1oubz3AlWI7Py55ponAPzYt4a7JsQw9reUHiQVKMWzh0jPQXmKw1d0n4t'
  })
);








mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => console.log("connected to database")).catch(err => console.log(err))



app.get('/home', authMiddleware, function (req, res) {
  res.status(200).send('Hello World!')
})



app.use('/api/user', authRegister)
app.use('/api/user', authLogin)
app.use(authMiddleware)

app.use('/api/payment', payment)
app.use('/api/subscription', subscription)
app.use('/api/stripe', customer)






app.listen(4000, () => console.log("listening on port 4000"))