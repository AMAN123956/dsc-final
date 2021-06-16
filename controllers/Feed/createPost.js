const { validationResult } = require("express-validator");
const Post = require("../../models/Post/postModel");
const User = require("../../models/User");
const cloudinary = require('cloudinary').v2

module.exports = async (req, res) => {
    let { textPost,imageUrl } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        let user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json("User not found");
        console.log("request.body",req.body)
        /* Cloudinary */

        
        let newPost = await new Post({
            textPost,
            imageUrl,
            name: user.name,
            user: req.user,
            email: req.user.email
        });

        await newPost.save();

        res.send("Post is created, congratulations!");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
};