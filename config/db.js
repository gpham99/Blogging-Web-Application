const mongoose = require('mongoose')
const config = require('config')

// this is the variable that gets used in connectDB
const db = config.get('mongoURI')

// mongoose.connect(db) -- this alone gives back a promise
const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('MongoDB connected...')
    }
    catch(err) {
        console.log(err.message)
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB