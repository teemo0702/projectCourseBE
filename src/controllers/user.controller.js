'use strict'

const UserService = require("../services/user.service")


class UserController {

    getListUser = async ( req, res, next) => {
        try {
            return res.status(200).json(await UserService.getListUser())
        } catch (error) {
            next(error)
        }
    }

    createUser = async ( req, res, next) => {
        try {
            if (req.user.role !== 'ADMIN') {
                return res.status(401).json({
                    code: 'xxx',
                    message: 'khong duoc phep',
                })
            }
            return res.status(200).json(await UserService.createUser(req.body))
        } catch (error) {
            next(error)
        }
    }

    getUser = async ( req, res, next) => {
        try {
            const { userName } = req.params
            return res.status(200).json(await UserService.getUser(userName))
        } catch (error) {
            
        }
    }
}

module.exports = new UserController()