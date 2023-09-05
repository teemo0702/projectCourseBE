'use strict'

const jwt = require('jsonwebtoken')

class MiddlewareController {
    verifyToken = async (req, res, next) => {
        const token = req.get('Authorization')
        if (!token) {
            return res.status(401).json({error: 'access denied'})
        }
        try {
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY)
            if (!decodeToken) {
                return res.status(401).json({error: 'token invalid'})
            }
            req.user = decodeToken
            next()
        }
        catch (exception) {
            return res.status(401).json({message: exception.message})
        }
        
    }

    verifyAdmin = async (req, res, next) => {
        
    }
}

module.exports = new MiddlewareController()