const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

const User = require('../models/user/user')

module.exports.login = async function (req, resp) {
    console.log('Login ...')

    const userResult = await User.findOne({ email: req.body.email })

    if (userResult) {
        console.log('User is founded')

        const enteredPasswordBcrypt = bcrypt.compareSync(req.body.password, userResult.password)

        if (enteredPasswordBcrypt) {
            console.log("Password is currect")

            const token = jwt.sign({
                email: userResult.email,
                userId: userResult._id
            },
                keys.jwt,
                {
                    expiresIn: 60 * 60
                }
            )
            console.log(token)

            resp.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else {
            resp.status(401).json("Password is wrong")
            console.log("Password is wrong")
        }
    }
    else {
        console.log('User is not founded')

        resp.status(404).json('User with this email is not found')
    }
}

module.exports.register = async function (req, resp) {
    console.log('Register ...')

    const userResult = await User.findOne({ email: req.body.email })

    if (userResult) {
        resp.status(409).json({
            message: `User with this email is already exists !`
        })
        console.log(`User with this email is already exists !`)
    }
    else {

        const salt = bcrypt.genSaltSync(10)

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        })

        try {
            await user.save()

            resp.status(201).json({
                message: 'User Is created'
            })

            console.log('User Is created')
        }
        catch (err) {
            console.log('Error creating')
            errorHandler(resp, err)
        }
    }
}