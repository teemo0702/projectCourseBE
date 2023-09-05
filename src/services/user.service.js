'use strict'

const userModel = require("../models/user.model")

class UserService {

    static getListUser = async () => {
        try {
            const users = await userModel.find({}).lean()
            return {
                code: 0,
                message: 'data success',
                response: users,
            }
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    static createUser = async ({ name, email, userName, role }) => {
        const holderEmail = await userModel.findOne({ email }).lean()
        if (holderEmail) {
            return {
                code: 'xxx',
                message: 'Email da co roi',
            }
        }
        const holderUserName = await userModel.findOne({ userName }).lean()
        if (holderUserName) {
            return {
                code: 'xxx',
                message: 'user name da co roi',
            }
        }
        const createdUser = await userModel.create({ name, email, userName, role, password: '123123' })
        return {
            code: 0,
            message: 'data success',
            reponse: createdUser,
        }
    }

    static getUser = async (userName) => {
        console.log(userName)
        const user = await userModel.findOne({ userName }).exec()
        return {
            code: 0,
            message: 'data success',
            reponse: user,
        }
    }
}

module.exports = UserService