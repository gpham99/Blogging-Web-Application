const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
const Post = require('../../models/Post')

// @route   GET /api/feed
// @descr   Test route for all logged in profiles
// @access  Public
// @return  all posts as JSON obj
router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find()
        if (Object.keys(posts).length !== 0) {
            return res.json(posts)    
        }
        res.send('No post available')
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router