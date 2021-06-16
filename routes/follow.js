const express = require('express');
const router = express.Router();

// middleware to check for authentication status
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const getUsers = require('../controllers/Follow/getUsers')
const addUsers = require('../controllers/Follow/addUsers')
const addFollower = require('../controllers/Follow/addFollowers.js')


// ROUTE FOR GETTING ALL Users(except sign-in user)
router.route('/').get(getUsers)

// ROUTE FOR ADDING A Followers TO Users Collection
router.route('/add_follower/:post_id').put(ensureAuthenticated, addFollower)




// Router Exported
module.exports = router
