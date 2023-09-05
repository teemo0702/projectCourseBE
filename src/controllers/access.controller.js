'use strict'

const AccessService = require("../services/access.service")
const jwt = require('jsonwebtoken')

class AccessController {

    signUp = async ( req, res, next) => {
        try {
            console.log(`[P]:::signUp`, req.body)
            return res.status(201).json(await AccessService.signUp(req.body))
        } catch (error) {
            next(error)
        }
    }

    logIn = async ( req, res, next) => {
        const { userName, password } = req.body
        return res.status(200).json(await AccessService.logIn(userName, password))
    }
}

module.exports = new AccessController()