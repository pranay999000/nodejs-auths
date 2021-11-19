const express = require('express')
const { check } = require('express-validator')
const { isSignedIn } = require('../middleware/authMiddleware')

const router = express()
const { signup, signout, signin, alluser } = require('./../controller/authController')

router.post(
    '/sign-up',
    [
        check('id', 'Id should be at least 5 charaters long').isLength({ min: 5 }),
        check('password', 'Password should be at least 6 charaters long').isLength({ min: 6 })
    ],
    signup
)

router.post(
    '/sign-in',
    signin
)

router.get('/sign-out', signout)
router.get('/all-user', isSignedIn, alluser)

module.exports = router