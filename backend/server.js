const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const dbConnect = require('./config/db/dbConnect')
const app = express() // create an instance of express - app

// db
dbConnect()

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))