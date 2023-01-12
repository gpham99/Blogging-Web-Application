import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ debug: true });

const URI = process.env.MONGODB_URL;

mongoose.connect(
    `${URI}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Mongodb connection");
    }
);
