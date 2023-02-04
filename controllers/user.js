const User = require('../models/User')
const jwt = require('jsonwebtoken');

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({})
        res.status(200).json({users})
    } catch(err) {
        console.error(err);
        res.status(404).json({err})
    }
} 

const createUser = async (req,res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const token = jwt.sign( {userId: user._id, name: user.name}, process.env.JWTSECRET, {
            expiresIn: '30d'
        } )
        res.status(200).json({user, token})
    } catch (error) {
        console.error(error);
        res.status(404).json({error})
    }

}

module.exports = {getAllUsers, createUser}