const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("MongoDB Connection Error", error);
    }
}

module.exports = connectDB;