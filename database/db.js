const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/blogdata");
        if (connect) {
            console.log("Database connection is successfully");
        }
    } catch (error) {
        console.log("database connection is failed : " + error);
    }
}

module.exports = { dbConnect }