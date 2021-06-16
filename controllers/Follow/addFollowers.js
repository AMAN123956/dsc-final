const User = require("../../models/User")

module.exports = async (req, res) => {
    try {
        console.log("here")
        console.log(req.params)
        let post = await User.findById(req.user._id);
        if (!post)
            return res.status(404).json("POST NOT FOUND")
        const newFollow = {
            user: req.params.post_id
        }
        if (post.following.find(like => like.user.toString() === req.user.id.toString())) {
            await post.following.shift(newFollow);
            await post.save()
            return res.send("saved")
        }
        await post.following.unshift(newFollow);
        console.log("saved")
        await post.save()
        res.send(post)
    } catch (error) {
        console.error(error)
        res.status(500).json("SERVER ERROR")
    }
}