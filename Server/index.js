const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const crypto=require('crypto')
const Razorpay=require("razorpay")
dotenv.config();

const userRoute = require('./routes/userRoutes')
const tutorRoute = require('./routes/tutorRoutes')
const tutorfeedbackRoutes = require('./routes/feedbackRoute');
const Adminrouter=require('./routes/admin-router')
const studentRequestRoutes = require('./routes/studentRequest');
const transactionRoutes = require('./routes/transactionRoute');
const snapshotRoutes = require('./routes/snapshotRoute');
app.use(cors())
app.use(express.json());
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected SUccessfully")
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err);
            console.log("Running Successfully at", process.env.PORT)
        });

    })
    .catch((error) => {
        console.log("Error:", error)
    })

app.use(tutorfeedbackRoutes);
app.use(userRoute);
app.use(tutorRoute);
app.use(Adminrouter);
app.use('/api/student-requests', studentRequestRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/snapshot', snapshotRoutes);
