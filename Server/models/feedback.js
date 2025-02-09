// server/models/Tutor.js
const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: String,
  ratings: [{ type: Number }],
  feedback: [{ type: String }],
});

const FeedBack = mongoose.model('Feedback', tutorSchema);

module.exports = FeedBack;
