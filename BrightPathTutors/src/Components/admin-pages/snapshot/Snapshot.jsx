import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';

const Snapshot = () => {
    const handleDownload = async () => {
        try {
            const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
            const response = await axios.get('http://localhost:5000/api/snapshot/all-data', {
                responseType: 'blob'
            });

            // Convert Blob to Excel file
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Use FileSaver.js to save the file
            saveAs(blob, `all_data_${currentDate}.xlsx`); // Include current date in the file name
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Button variant="contained" onClick={handleDownload}>Export DATA</Button>
    );
};

export default Snapshot;
