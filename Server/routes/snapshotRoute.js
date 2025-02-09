const express = require('express');
const moment = require('moment');
const ExcelJs = require('exceljs');
const User = require('../models/usermodel');
const TutorFeedback = require('../models/feedback');
const Tutor = require('../models/tutormodel');
const StudentRequest = require('../models/request');
const Transaction = require('../models/paymentModel');

const router = express.Router();

router.get('/all-data', async (req, res, next) => {
    const startDate = moment(new Date()).startOf('month').toDate();
    const endDate = moment(new Date()).endOf('month').toDate();
    try {
        // Fetch data from all collections
        const users = await User.find({});
        const tutorFeedbacks = await TutorFeedback.find({});
        const tutors = await Tutor.find({});
        const studentRequests = await StudentRequest.find({});
        const transactions = await Transaction.find({});

        // Create workbook and worksheet
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('All Data');

        // Define columns for each collection
        worksheet.columns = [
            {header: 'Collection', key: 'collection', width: 20},
            {header: 'Data', key: 'data', width: 100},
        ];

        // Add data from each collection to the worksheet
        const dataRows = [
            {collection: 'Users', data: JSON.stringify(users)},
            {collection: 'Tutor Feedbacks', data: JSON.stringify(tutorFeedbacks)},
            {collection: 'Tutors', data: JSON.stringify(tutors)},
            {collection: 'Student Requests', data: JSON.stringify(studentRequests)},
            {collection: 'Transactions', data: JSON.stringify(transactions)},
        ];

        dataRows.forEach(row => {
            worksheet.addRow(row);
        });

        // Format header row
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = {bold: true};
        });

        // Convert the workbook to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Set response headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=snapshot.xlsx');

        // Send the buffer as the response
        res.send(buffer);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
