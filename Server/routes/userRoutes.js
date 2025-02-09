const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/usermodel')
const router = express.Router();
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "30d"
    })
}

// Create a user
router.post('/', async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: password,

        })
        res.status(201).json(
            {
                message: "User Successfully added",
                token:generateToken(userAdded._id)

            })

    } catch (error) {
        console.log("Dublicate Email")
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            message: "User Successfully logged in",
            user:user,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(400).json("Invalid Email or Password!")
    }
})

// Get all users
router.get('/', async (req, res) => {
    try {
        const showAll = await User.find()

        res.status(200).json(showAll)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//getsingle user
router.get('/user/:id', async (req, res) => {
    console.log("Inside IsTutor=False")

    const { id } = req.params;
    try {
        const SingleUser = await User.findById({ _id: id })
        // console.log("Request received")
        res.status(200).json(SingleUser)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//delete user
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const DeleteUser = await User.findByIdAndDelete({ _id: id })

        res.status(200).json(DeleteUser)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//update user
router.patch('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        const UpdateUser = await User.findByIdAndUpdate(id, req.body, { new: true },);

        res.status(200).json(UpdateUser)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;