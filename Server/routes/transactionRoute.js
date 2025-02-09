const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");
const StudentRequest = require('../models/request');


// Route to create order with Razorpay
router.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send("Error creating order");
    console.log(error);
  }
});

// Route to validate transaction payment
router.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,tutorID,studentID,receiptId} =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      tutorID,
      studentID,
      receiptId,
    });

    // Update ispaid attribute in StudentRequest
    await StudentRequest.findOneAndUpdate(
      { _id: receiptId }, // Find by receiptId
      { $set: { ispaid: true, status: 'accepted' } }, // Set ispaid to true 
      { new: true } // Return the updated document
    );
    console.log("Payment successful");
    window.location.reload();
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
