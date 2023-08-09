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
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()





// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())


//cors middleware

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  credentials: true, // Allow credentials (cookies)
};

// Use the cors middleware with the configured options
app.use(cors(corsOptions));









//creating session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'sessions',
});

//session

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 2592000000, //you have to set the age directly
    secure: false, //!set to true during production
    httpOnly: true
  }
}))

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => console.log("connected to database")).catch(err => console.log(err))


app.get('/home', authMiddleware, function (req, res) {
  res.status(200).send('Hello World!')
})



app.use('/api/user', cors(corsOptions), authRegister)
app.use('/api/user', cors(corsOptions), authLogin)
app.use(authMiddleware)

app.use('/api/payment', payment)
app.use('/api/subscription', subscription)
app.use('/api/stripe', customer)






app.listen(4000, () => console.log("listening on port 4000"))