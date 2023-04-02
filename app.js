const cors = require('cors');
const express = require("express");
const app = express();
const { dbConnect } = require('./database/db');
const { userModel } = require('./model/userModel');
const dotenv = require('dotenv');

// access .env config
dotenv.config({ path: "./.env" });

// routes import
const userRouter = require("./routers/userRoutes");
const blogRuter = require("./routers/blogRouters");

// Database connection
dbConnect();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/user', userRouter);
app.use("/api/v1/blog", blogRuter);


// port value from .env file
const PORT = process.env.PORT || 4000;

app.listen( PORT , () => {
    console.log("Server started successfully in " + PORT);
})