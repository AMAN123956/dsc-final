const router = require('express').Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const post = require('../models/Post/postModel')
const createPost = require('../controllers/Feed/createPost')
const getPosts = require('../controllers/Feed/getPosts')
const getSinglePost = require('../controllers/Feed/getSinglePost')
const removePost = require('../controllers/Feed/removePost')
const updatePost = require('../controllers/Feed/updatePost')
const addLike = require('../controllers/Feed/addLike')
const addComment = require('../controllers/Feed/addComment')

// ROUTE FOR POSTING A NEW POST IN FEED
router.route('/').post(ensureAuthenticated, createPost)

// ROUTE FOR GETTING ALL POSTS IN FEED
router.route('/').get(getPosts)

// ROUTE FOR GETTING A SINGLE POST BY ID IN FEED
router.route('/single_post/:post_id').get(getSinglePost).put(ensureAuthenticated, updatePost);

// ROUTE FOR DELETING A SINGLE POST BY ID IN FEED
router.route('/delete_post/:post_id').delete(ensureAuthenticated, removePost)



// ROUTE FOR ADDING A LIKE TO POST IN FEED
router.route('/add_like/:post_id').put(ensureAuthenticated, addLike)


// ROUTE FOR ADDING A COMMENT TO A POST IN FEED
router.route('/add_comment/:post_id').put(ensureAuthenticated, addComment)

module.exports = router