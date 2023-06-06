// require user model
const User = require('../models/user')

// require bcrypt
const bcrypt = require('bcrypt')

// require jwt
const jwt = require('jsonwebtoken')
const user = require('../models/user')

// Register
exports.register = async (req, res) => {
    try {
        const {name, email, password, phone} = req.body
        const foundUser = await User.findOne({email})
        if (foundUser) {
            res.status(400).send({errors : [{msg: 'Email already used'}]})
        }
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User ({...req.body})
        newUser.password = hashedPassword
        newUser.save()

        const token = jwt.sign({
            id: newUser._id
        }, process.env.SECRET_KEY)

        res.status(200).send({success : [{msg: 'Register Successfully'}], newUser, token})
    } catch (error) {
        res.status(400).send({errors : [{msg: 'Cannot register'}]})
    }
}


// Login
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const foundUser = await User.findOne({email})
        if (!foundUser) {
           return  res.status(400).send({errors : [{ msg : "Utilisateur où E-mail non trouvé"}]})
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password)
        
        if (!checkPassword) {
            return res.status(400).send({errors : [{ msg : "Veuillez vérifier votre mot de passe!!"}]})
        }

        const token = jwt.sign({
            id: foundUser._id
        }, process.env.SECRET_KEY)

        res.status(200).send({success : [{msg : "Welcome Back"}] , foundUser , token}) 

    } catch (error) {
        res.status(400).send({errors : [{ msg : "Impossible de trouver l'utilisateur!!"}]}) 
    }
}

// get users
exports.getUsers = async (req, res) => {
    try {
        const Users = await user.find()
        res.status(200).send(Users)
    } catch (error) {
        res.status(400).send({errors: [{msg: 'error with getting products'}], error})
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    try {
        const {_id} = req.params
        await user.findByIdAndDelete({_id})
        res.status(200).send({success: [{msg: 'User deleted successfully'}]})
    } catch (error) {
        res.status(400).send({errors: [{msg: 'Cannot delete this user'}], error})
    }
}