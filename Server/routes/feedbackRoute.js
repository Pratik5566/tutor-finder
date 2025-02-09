const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const StudentRequest=require('../models/request')
// #1: Create a new feedback
router.post('/feedback', async (req, res) => {
  try {
    const { student, studentName, tutor, tutorName, rating, feedback } = req.body;
    const newFeedback = new Feedback({
      student,
      studentName,
      tutor,
      tutorName,
      ratings: [rating],
      feedback: [feedback],
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// #2: Edit existing feedback
router.put('/feedback/:id', async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    await Feedback.findByIdAndUpdate(req.params.id, {
      ratings: [rating],  // Replace existing ratings with new rating
      feedback: [feedback],  // Replace existing feedback with new feedback
    });
    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// #3: Get all feedbacks of a student
router.get('/feedbacks/:studentId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ student: req.params.studentId });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// #4: Get all feedbacks for a particular tutor
router.get('/tutor-feedbacks/:tutorId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ tutor: req.params.tutorId });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// #5: Get average rating for a particular tutor
router.get('/tutor-average-rating/:tutorId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ tutor: req.params.tutorId });
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this tutor' });
    }
    const totalRatings = feedbacks.reduce((acc, curr) => acc + curr.ratings.reduce((a, b) => a + b, 0), 0);
    const averageRating = totalRatings / (feedbacks.length * feedbacks[0].ratings.length);
    res.status(200).json({ averageRating });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Route to get names and IDs of tutors who have accepted the student's requests
router.get('/accepted-tutors/:studentId', async (req, res) => {
  try {
      const { studentId } = req.params;
      const acceptedRequests = await StudentRequest.find({ student: studentId, status: 'accepted' });
      const tutorInfo = acceptedRequests.map(request => ({
          tutorId: request.tutor,
          tutorName: request.tutorName
      }));
      res.status(200).json(tutorInfo);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


module.exports = router;
