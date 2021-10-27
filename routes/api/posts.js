const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const User = require('../../models/User')


// @route   POST /api/posts/create
// @descr   Create a post
// @access  Private
// @return  post as JSON obj
router.post('/create', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        // get the name of the user
        const user = await User.findById(req.user.id)
        
        const newPost = new Post ({
            title: req.body.title,
            description: req.body.description,
            author: req.user.id
        })
        const post = await newPost.save() // after we save the post we get it back as our response (a promise that's fulfilled)
        
        const posts = await Post.find({author: req.user.id})
        user.posts = posts
        await user.save()
        
        res.json(post)
    }
    catch( err ) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})



// @route   GET api/posts/:postId
// @descr   Get a post to read entirely
// @access  Public
// @return  post as JSON obj
router.get('/:postId', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (post){
            res.json(post)
        }
        else {
            return res.status(400).json({
                message: "Post doesn't exist"
            })
        }
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})



// @route   UPDATE api/posts/:postId/update
// @descr   Update a post
// @access  Private (only creator of post)
// @return  ...
router.put('/:postId/update', auth, async(req, res) => {
    const postId = req.params.postId
    try {
        // get the post
        const post = await Post.findById(postId)

        // check if post's id and token match
        if (req.user.id == post.author) {
            // get the request body
            const query = await Post.updateOne(
                {_id: postId}, req.body
            )
            res.json(query)
        }
        res.status(401).json({
            message: "You are not authorized to edit the post"
        })
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})



// @route   DELETE api/posts/:postId/delete
// @descr   Delete a post
// @access  Private (only creator of post)
// @return  delete result as JSON obj
router.delete('/:postId/delete', auth, async(req, res) => {
    const postId = req.params.postId
    try {
        // get the post first
        const post = await Post.findById(postId)

        // check if post's id and token match
        if (req.user.id == post.author) {
            // delete the post
            const query = await Post.deleteOne({_id: postId})

            //update post array of corresponding author
            const posts = await Post.find({author: req.user.id})
            const user = await User.findById(req.user.id)
            user.posts = posts
            await user.save()
            
            // return the query
            return res.json(query)
        }
        res.status(401).json({
            message: "You are not authorized to delete this post"
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router