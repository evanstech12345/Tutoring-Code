const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const authRegister = require('./routes/register');
require('dotenv').config()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => console.log("connected to database")).catch(err => console.log(err))



app.get('/', function (req, res) {
  res.send('This is the backend server')
})

app.use('/api/user', authRegister)
app.listen(4000, () => console.log("listening on port 4000"))