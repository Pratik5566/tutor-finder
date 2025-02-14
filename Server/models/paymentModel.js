const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  receiptId : { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);