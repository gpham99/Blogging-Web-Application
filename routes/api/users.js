const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config') // this is not the same as importing a folder - it's truly universal i guess?
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const auth = require('../../middleware/auth')


// @route   POST /api/users/create
// @descr   Register user
// @access  Public
// @return  Token as JSON obj (using res.json)
router.post('/create', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter the password with 6 or more characters').isLength({
        min: 6
    }),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { // if there are errors like invalid email or password left empty, send back 404 - bad request
        return res.status(400).json({
            errors: errors.array(),
        })
    }

    const {name, email, password} = req.body
    try {
        let user = await User.findOne({ email })

        // See if the user exists
        if (user) {
            errors.errors.push(
                {
                    "msg": "Email already in use",
                    "param": "email",
                    "location": "body"
                }
            )
            return res.status(400).json({
                errors: errors.array()
            })
        }

        user = new User({
            name,
            email,
            password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save() // use await for every promise

        // Return JSONwebtoken
        const payload = {
            user: {
                id: user.id, //in mongodb, the id appears as _id, but mongoose uses abstraction to convert it to id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000},
            (err, token) => {
                if (err) {throw err}
                res.json({  token   })
            }
        )
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   GET /api/users/me
// @descr   Get our own profile
// @access  Private
// @return  ret our own profile 
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await User.findOne({ _id: req.user.id }).populate('posts')
        if (!profile) {
            return res.status(400).json({
                msg: 'No profile for this user'
            })
        }
        res.json(profile)
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route   PUT /api/users/update
// @descr   Update the requester's own info (excl. posts)
// @access  Private
// @return  update result as JSON obj 
router.put('/update', [
    auth, 
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter the new password with 6 or more characters').isLength({ min: 6 }),
    check('currentpassword', 'Current password is required').exists().custom((value) => value.trim() !== "")
    ],
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }

        const {name, email, password, currentpassword} = req.body
        try {
            const profile = await User.findOne({ _id: req.user.id })
            if (!profile) {
                return res.status(400).json({
                    msg: 'No profile for this user'
                })
            }

            // check if the current password matches
            const isMatch = await bcrypt.compare(currentpassword, profile.password)
            if (!isMatch) {
                errors.errors.push({
                    "msg": "Invalid Credentials",
                    "param": "currentpassword",
                    "location": "body"
                })
            }

            // check if the email has been used by another account
            if (email !== profile.email) {
                let user = await User.findOne({ email })
                if (user) {
                    errors.errors.push({
                            "msg": "Email already in use",
                            "param": "email",
                            "location": "body"
                        }
                    )
                }
            }

            // Check if it can go through alright now
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                })
            }
            else {
                // update the db
                try {
                    const salt = await bcrypt.genSalt(10)
                    const updatedpassword = await bcrypt.hash(password, salt)

                    const updated = await User.findByIdAndUpdate(
                        req.user.id,
                        {
                            $set : {
                                name: name,
                                email: email,
                                password: updatedpassword
                            }
                        }
                    )
                    res.status(200).send("Profile updated successfully");
                }
                catch(err) {
                    console.error(err.message)
                    res.status(500).send('Server error')
                }
            }
        }
        catch(err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
})




// @route   DELETE /api/users/delete
// @descr   Delete the requester's own acc
// @access  Private (requires only token)
// @return  delete result as JSON obj
router.delete('/delete', auth, async (req, res) => {
    try {
        const deleted = await User.deleteOne({_id: req.user.id})
        res.json(deleted)
    }
    catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router