const Post = require("../../models/Post/postModel")

module.exports = async (req, res) => {
    try {
        console.log("here")
        console.log(req.params)
        let post = await Post.findById(req.params.post_id);
        if (!post)
            return res.status(404).json("POST NOT FOUND")
        const newLike = {
            user: req.user.id
        }
        if (post.likes.find(like => like.user.toString() === req.user.id.toString())) {
            await post.likes.shift(newLike);
            await post.save()
            return res.send("saved")
        }
        await post.likes.unshift(newLike);
        console.log("saved")
        await post.save()
        res.send(post)
    } catch (error) {
        console.error(error)
        res.status(500).json("SERVER ERROR")
    }
}