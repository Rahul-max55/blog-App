const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    message: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: ["true" , "user id is required"]
    }
})

const blogModel = new mongoose.model("Blogpost", blogSchema);

module.exports = blogModel; 