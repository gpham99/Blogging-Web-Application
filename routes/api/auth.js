const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config') // this is not the same as importing a folder - it's truly universal i guess?
const { check, validationResult } = require('express-validator')


// @route   GET /api/auth
// @descr   Test route truly JUST FOR TESTING
// @access  Private
router.get('/', auth, async (req, res) => {
    // make a call to the db using async await
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST /api/auth
// @descr   Authenticate user and get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists().custom((value) => value.trim() !== "")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { // if there are errors, send back 404 - bad request
        return res.status(400).json({
            errors: errors.array(),
        })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        // Throws error when user doesn't exist
        if (!user) {
            // if the message showing up is not the LAST json message (below there's a res.send), make sure to use return
            errors.errors.push(
                {
                    "msg": "Invalid Credentials",
                    "param": "password",
                    "location": "body"
                }
            )
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                "errors": [{
                    msg: "Invalid Credentials",
                }]
            })
        }

        // Return JSONwebtoken
        const payload = {
            user: {
                id: user.id,
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

module.exports = router