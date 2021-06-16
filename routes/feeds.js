const express = require('express');
const router = express.Router();
const Post = require('../models/Post/postModel')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('landing'));

// Feed Page
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const postData = await Post.find({})
  console.log("post", postData)
  console.log(req.user)

  res.render('feeds', {
    user: req.user,
    posts: postData
  })
}
);

module.exports = router;
