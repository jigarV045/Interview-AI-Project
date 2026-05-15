const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: [true, "Username already taken"],
    },

    email: {
        type: String,
        require: true,
        unique: [true, "User with this email already registered"],
    },

    password: {
        type: String,
        require: true,
    }
})

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;