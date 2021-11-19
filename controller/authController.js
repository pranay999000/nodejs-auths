const { check, validationResult } = require('express-validator')
var jwt = require('jsonwebtoken')

const JWT_SECRET = "JWTSECRET"

let userList = []

exports.signup = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            error: errors.array()[0].msg
        })
    } else {
        const token = jwt.sign(
            { id: req.body.id },
            JWT_SECRET
        )

        res.cookie('token', token, {
            expire: new Date() + 60
        })

        let user = {
            id: req.body.id,
            password: req.body.password
        }

        userList.push(user)

        res.status(200).json({
            success: true,
            message: "Authentication successful",
            token: token
        })
    }
}


exports.signin = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            error: errors.array()[0].msg
        })
    } else {

        const user = userList.find(({ id }) => id === req.body.id)

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
        } else {
            if (user.password === req.body.password) {
                const token = jwt.sign({ id: req.body.id }, JWT_SECRET);

                res.cookie("token", token, {
                    expire: new Date() + 60,
                });

                res.status(200).json({
                    success: true,
                    message: "Signed in successfully!",
                    token: token
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Password does not match!"
                })
            }
        }

    }

}



exports.alluser = async (req, res) => {
    res.status(200).json({
        success: true,
        users: userList
    })
}



exports.signout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        success: true,
        message: "Successfully sign out!"
    })
}