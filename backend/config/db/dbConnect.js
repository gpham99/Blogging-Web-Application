const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URL,
            {
            // useFindAndModify: true,
            })
        console.log("db is connected successfully");
    } catch (err) {
        console.log(`error ${err.message}`)
    }
}

module.exports = dbConnect