const User = require("../../models/User");

module.exports = async (req, res) => {
    try {
        const users = await User.find()
        
        let filteredUser = []
        filteredUserStatus=[]
        // filter user except the admin user
        /*for (let i = 0; i < (await users).length; i++){
            if (users[i].email !== req.user.email)
                filteredUser.push(users[i])
        }
        console.log("2"+users[11].following.length)
        for (let i = 0; i < filteredUser.length; i++){
            if (users[i].following.length != 0) {
                for (let j = 0; j < users[i].following.length; j++) {
                    if (filteredUser[i]._id == users[i].following[j].user) {
                        status = "false";
                        filteredUserStatus.push({ status, user: filteredUser[i] })
                    }
                    else {
                        status = "true";
                        filteredUserStatus.push(filteredUser[i])
                    }
                }
            }
            else {
                filteredUserStatus.push({ status: "true", user: filteredUser[i] })
            }
        }
        console.log(filteredUserStatus)
        res.send(filteredUserStatus)
          // filtered is [12, 130, 44]
          */
        filteredUser = [...users];
        
        const loginUser = await User.findById(req.user._id)
      
        let fArray=[]
        let counter = 0;
        for (let i = 0; i < await (users.length); i++){
            counter+=1;
            for (let j = 0; j < await(loginUser.following.length); j++){
                // console.log('it' + users[i].id)
                // console.log("again"+loginUser.following[j].user)
                    
                    if (users[i].id == loginUser.following[j].user) {
                        console.log("runs")
                         counter-=1;
                        filteredUser.splice(counter, 1)
                        
                        continue;
                    }
               
               
            }
        }
        
        console.log(filteredUser.length)
        res.send(filteredUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json("SERVER ERROR...")
    }
}