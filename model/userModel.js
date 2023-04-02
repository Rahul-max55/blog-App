const mongoose = require('mongoose');


const createdSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref:"Blogpost"
    }]
}, { timestamps: true });


const userModel = mongoose.model("User", createdSchema);

module.exports = { userModel };


