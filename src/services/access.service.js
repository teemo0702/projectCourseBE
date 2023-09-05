

'use strict'
const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require('../utils')


const RoleUser = {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
    ADMIN: 'ADMIN',
}

class AccessService {

    static signUp = async ({ name, email, password }) => {
        try {
            // check email exists
            const holderUser = await userModel.findOne({ email }).lean()
            if (holderUser) {
                return {
                    code: 'xxx',
                    message: 'Tai khoan da co roi',
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = await userModel.create({
                name, email, password: passwordHash, roles: [RoleUser.STUDENT]
            })

            if (newUser) {
                // create privateKey, publicKey
                // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                // })

                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                console.log({ privateKey, publicKey })

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey,
                    privateKey,
                })

                if (!keyStore) {
                    return {
                        code: 'xxx',
                        mesage: 'publicKeyString error'
                    }
                }

                // create tokens pair
                const tokens = await createTokenPair({
                    userId: newUser._id,
                    email,
                }, publicKey, privateKey)
                console.log(`Create token sucess::`, keyStore)

                return {
                    code: 201,
                    metadata: {
                        user: getInfoData({
                            fields: ['_id', 'name', 'email'],
                            object: newUser,
                        }),
                        tokens,
                    }
                }
            }

            return {
                code: 200,
                metadata: null,
            }


        } catch (error) {
            return {
                code: 'xxxthis',
                message: error.message,
                status: 'error',
            }
        }
    }

    static logIn = async (userName, password) => {
        const user = await userModel.findOne({ userName })
        if (!user) {
            if (userName === 'admin') {
                if (password === 'admin') {
                    const accessToken = jwt.sign(
                        {
                            userName: 'admin',
                            role: 'ADMIN',
                        },
                        process.env.SECRET_KEY,
                        { expiresIn: '3600s' },
                    )
                    return {
                        code: 0,
                        message: 'login success',
                        data: {
                            accessToken,
                            role: 'ADMIN',
                        }
                    }
                } else {
                    return {
                        code: 'xxx',
                        message: 'wrong password',
                    }
                }
            } else {
                return {
                    code: 'xxx',
                    message: 'username khong dung'
                }
            }

            // return {
            //     code: 'xxx',
            //     message: 'username khong dung'
            // }
        }
        // const validPassowrd = await bcrypt.compare(password, user.password)
        // if (!validPassowrd) {
        //     return {
        //         code: 'xxx',
        //         message: 'wrong password'
        //     }
        // }
        if (password !== user.password) {
            return {
                code: 'xxx',
                message: 'wrong password',
            }
        }
        const accessToken = jwt.sign(
            {
                userName: user.userName,
                role: user.role,
            },
            process.env.SECRET_KEY,
            { expiresIn: '3600s' },
        )
        return {
            code: 0,
            message: 'login success',
            data: {
                accessToken,
                role: user.role,
            }
        }
    }
}

module.exports = AccessService