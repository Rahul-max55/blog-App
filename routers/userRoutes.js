const express = require('express');
const { getAllUsersController, loginUserController, registerUserController, getUserblogController } = require('../controllers/userController');

// router Object
const router = express.Router();

//GET ALL USER || GET
router.get("/all_users", getAllUsersController);

// CREATE USER || POST
router.post("/register", registerUserController);

// LOGIN || POST
router.post("/login", loginUserController);

// USERBLOG || GET
router.get('/user_blog/:id' , getUserblogController)

module.exports = router;