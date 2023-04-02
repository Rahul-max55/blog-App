const mongoose = require("mongoose");
const blogModel = require("../model/blogModel");
const {userModel} = require("../model/userModel");

exports.getAllBlogController = async (req, res) => {
    try {
        const all_blog = await blogModel.find();
        if (all_blog.length === 0) {
            return res.status(201).send({
                success: true,
                message: "No blogs is available",
                all_blog
            })
        }

        res.status(200).send({
            success: true,
            message: "blog data is present",
            all_blog
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "blog post does not created",
            error
        })
    }
}



exports.insertBlogController = async (req, res) => {
    const { title, message , userId } = req.body;
    try {
        if (!title || !message || !userId) {
            return res.status(201).send({
                success: false,
                message: "Please fill all the fileds"
            })
        }

        const existingUser = await userModel.findById(userId);

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user"
            })
        }

        const newBlog = new blogModel({ title, message , userId });

        // using of session we can add our blogs in user database
        // const session = await mongoose.startSession();
        // session.startTransaction();

        await newBlog.save()
        existingUser.blogs.push(newBlog);
        await existingUser.save();

        // await session.commitTransaction();
        // end session

        // await newBlog.save();

        res.status(200).send({
            success: true,
            message: 'Blog data inserted successfully',
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Failed to insert blogs",
            error
        })
    }
}



exports.SingleBlogController = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await blogModel.findOne({ _id: id });
        console.log(userData);
        if (!userData) {
            return res.status(201).send({
                success: false,
                message: "data not found",
            })
        }
        res.status(200).send({
            success: true,
            message: 'One Blog data Get successfully',
            userData
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Failed to insert blogs",
            error
        })
    }
}
exports.UpdateBlogController = async (req, res) => {
    const { id } = req.params;

    try {
        const userData = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!userData) {
            return res.status(201).send({
                success: false,
                message: "data not found",
            })
        }
        res.status(200).send({
            success: true,
            message: 'One Blog data Updated successfully',
            userData
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Failed to insert blogs",
            error
        })
    }
}

exports.DeleteBlogController = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // using of pupulate we can get the another collection details
        const userData = await blogModel.findOneAndDelete(id).populate('userId');
        console.log(userData);
        // In userData we can getting the user who can holds blogs
        await userData.userId.blogs.pull(userData);
        await userData.userId.save();

        res.status(200).send({
            success: true,
            message: 'One Blog data Deleted successfully',
            userData
        })
    } catch (error) {
        console.log(error);
        return res.status(201).send({
            success: false,
            message: "Failed to delete blogs",
            error
        })
    }
}


