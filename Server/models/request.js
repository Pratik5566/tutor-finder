const mongoose = require('mongoose');

const studentRequestSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    studentName: { type: String },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' },
    tutorName: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    created_at: { type: Date, default: Date.now },
    ispaid :{type:Boolean,default:false,reuired:true},
});

// Adding compound index to ensure uniqueness of student and tutor combination with pending status
studentRequestSchema.index(
    { student: 1, tutor: 1, status: 1 }, // Indexing student, tutor, and status fields
    {
      unique: true, // Ensuring uniqueness
      partialFilterExpression: { // Filtering for documents with status 'pending' or 'accepted'
        $or: [{ status: 'pending' }, { status: 'accepted' }]
      }
    }
  )

module.exports = mongoose.model('StudentRequest', studentRequestSchema);
