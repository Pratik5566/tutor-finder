const express = require('express')
const mongoose = require('mongoose')
const Tutor = require('../models/tutormodel')
const router = express.Router();
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "30d"
    })
}

// Create a tutor
router.post('/tutor', async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const tutorAdded = await Tutor.create({
            name: name,
            email: email,
            phone: phone,
            password: password,

        })
        res.status(201).json(
            {
                message: "Tutor Successfully added",
                token:generateToken(tutorAdded._id)

            })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//Login tutor
router.post('/tutorlogin', async (req, res) => {
    const { email, password } = req.body;
    const tutor = await Tutor.findOne({ email })
    if (tutor && (await tutor.matchPassword(password))) {
        res.status(200).json({
            message: "Tutor Successfully logged in",
            tutor:tutor,
            token:generateToken(tutor._id)
        })
    }
    else {
        res.status(400).json("Invalid Email or Password!")
    }
})

// Get all tutors
router.get('/tutor', async (req, res) => {
    try {
        const showAll = await Tutor.find()
        res.status(200).json(showAll)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//getsingle tutor
router.get('/tutor/:id', async (req, res) => {
    console.log("Inside IsTutor=True")
    const { id } = req.params;
    try {
        const SingleTutor = await Tutor.findById({ _id: id })
        // const SingleTutor = await Tutor.findById({  id })
        res.status(200).json(SingleTutor)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//delete tutor
router.delete('/tutor/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // const DeleteTutor = await Tutor.findByIdAndDelete({ _id: id })
        const DeleteTutor = await Tutor.findByIdAndDelete({  id })

        res.status(200).json(DeleteTutor)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//update tutor
router.patch('/tutor/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        const UpdateTutor = await Tutor.findByIdAndUpdate(id, req.body, { new: true },);

        res.status(200).json(UpdateTutor)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;