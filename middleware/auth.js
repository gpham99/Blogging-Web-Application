const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // axios.defaults.headers.common['x-auth-token'] 

    // Check if not token
    if (!token) {
        return res.status(401).json({ 
            message: 'No token. Authorization denied.'
        })
    }
    
    // Else, verify token
    try {
        // Decode the token
        const decoded = jwt.verify(token, config.get('jwtSecret')) // this returns the payload, which is passed onto req.user

        // Take the req obj and assign value to user attr
        // req starts out as an empty obj w/ some alr built-in attr like header
        // we can later use req.user in any of our protected route
        req.user = decoded.user

        // Pass to the next middleware
        next()
    }
    catch(err) {
        return res.status(401).json({  message: err.message })
    }
}