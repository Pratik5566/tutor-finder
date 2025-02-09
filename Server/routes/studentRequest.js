// routes/studentRequests.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const StudentRequest = require('../models/request');
const ObjectId = mongoose.Types.ObjectId;

// Route to create a new student request
router.post('/create', async (req, res) => {
    try {
        const { studentId, tutorId ,studentName,tutorName } = req.body;
        const newRequest = await StudentRequest.create({ student: studentId, tutor: tutorId ,tutorName:tutorName,studentName:studentName});
        res.status(201).json(newRequest);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.student && error.keyPattern.tutor) {
            res.status(400).json({ message: 'Duplicate request for the same student and tutor with pending status.' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate id parameter
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        // Find the request by ID and delete it
        await StudentRequest.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Route to get all requests from a particular student
router.get('/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const requests = await StudentRequest.find({ student: studentId });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all requests to a particular tutor
router.get('/tutor/:tutorId', async (req, res) => {
    try {
        const { tutorId } = req.params;
        const requests = await StudentRequest.find({ tutor: tutorId });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to accept a request
router.put('/accept/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params;
        // Find the request by ID and update its status to "accepted"
        const updatedRequest = await StudentRequest.findByIdAndUpdate(requestId, { status: 'accepted' }, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/reject/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params; 
        // Find the request by ID and update its status to "rejected"
        const updatedRequest = await StudentRequest.findByIdAndUpdate(requestId, { status: 'rejected' }, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error("Error updating request status:", error); // Update this line for debugging
        res.status(500).json({ message: error.message });
    }
});





module.exports = router;
