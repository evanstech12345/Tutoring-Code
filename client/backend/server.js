const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const authRegister = require('./routes/register');
const authLogin = require('./routes/login');
const authMiddleware = require("./routes/middleware")

require('dotenv').config()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())

//cors middleware
// app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with the origin of your frontend
  })
);


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => console.log("connected to database")).catch(err => console.log(err))



app.get('/home', authMiddleware, function (req, res) {
  res.status(200).send('Hello World!')
})

app.use('/api/user', authRegister)
app.use('/api/user', authLogin)
app.use(authMiddleware)

app.listen(4000, () => console.log("listening on port 4000"))