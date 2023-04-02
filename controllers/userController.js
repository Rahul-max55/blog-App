const bcrypt = require("bcrypt");
const { userModel } = require("../model/userModel");


// getAllUsers controller
exports.getAllUsersController = async (req, res) => {
    try {
        const allData = await userModel.find();
        if (allData.length === 0) {
            return res.status(200).send({
                success: true,
                message: "No user present in database"
            })
        }
        res.status(200).send({
            userLength: allData.length,
            success: true,
            message: "all users data",
            allData
        })
    } catch (error) {
        res.status(201).send({
            success: false,
            message: "Error is getting the all user data",
            error
        })
        console.log(error);
    }
}

// register User
exports.registerUserController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(201).send({
                success: false,
                message: "Please fill all the fields"
            })
        }

        const dublicateUser = await userModel.findOne({ email });
        if (dublicateUser) {
            return res.status(201).send({
                success: false,
                message: "user already exists"
            })
        }

        const bcryptPass = await bcrypt.hash(password, 10);

        const register = new userModel({ username, email, password: bcryptPass })
        await register.save();

        res.status(200).send({
            success: true,
            message: "Data submitted in database successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "error occured in registration callback",
            error
        })
    }
}

//login User
exports.loginUserController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(201).send({
                success: false,
                message: "please fill all the fileds"
            })
        }

        const data = await userModel.findOne({ email });
        if (!data) {
            return res.status(201).send({
                success: false,
                message: "User does not exists"
            })
        }

        const passMatch = await bcrypt.compare(password, data.password);
        if (!passMatch) {
            return res.status(201).send({
                success: false,
                message: "Invalid credantials"
            })
        }

        res.status(200).send({
            success: true,
            message: "user login successfully"
        })

    } catch (error) {
        res.status(201).send({
            success: false,
            message: "error occured in login request",
            error
        })
    }
}


exports.getUserblogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        console.log(userBlog);

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with this is"
            })
        }

        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog
        })



    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in user blog",
            error
        })
    }
}

