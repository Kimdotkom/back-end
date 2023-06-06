// require express
const express = require('express')
const { register, login, getUsers, deleteUser } = require('../controllers/user')
const isAuth = require('../middleware/isAuth')
const { registerValidation, validator } = require('../middleware/validator')

// require router from express
const router = express.Router()

// routes

router.post('/register',registerValidation(), validator, register)

router.post('/login', login)

router.get('/get_users', getUsers)

router.delete('/delete_user/:_id', deleteUser)

router.get('/current', isAuth, (req, res) => {
    res.send(req.user)
})

//export
module.exports = router