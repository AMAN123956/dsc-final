const Post = require('../../models/Post/postModel')
const User = require('../../models/User')
module.exports = async (req, res) => {
    try {
        let posts = await Post.find();
        let users = await User.findById(req.user._id)
        let filterPost = []
       
        async function getData() {
            

            for (let i = 0; i < posts.length; i++) {
                for (let j = 0; j < users.following.length; j++) {
                    console.log('1')
                    if (String(posts[i].user) == String(users.following[j].user)) {
                        console.log("success")
                        await filterPost.push(posts[i])

                    } else {
                        console.log("not")
                    }
                }
            }
                
            for (let i = 0; i < posts.length; i++){
                if (String(posts[i].user) == String(req.user._id)) {
                    console.log("here")
                    await filterPost.push(posts[i])
                }
            }



            await console.log(filterPost)
            await res.send(filterPost);

        }


        // function to get posts by followed users and then send the data
        getData()




    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
};