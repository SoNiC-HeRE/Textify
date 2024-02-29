//connection to MongoDB database

import mongoose from "mongoose";

const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected to MongoDB database");
    } catch (err) {
        console.log(`Error connecting to MongoDB database: ${err}`);
    }
}

export default connectToDb;