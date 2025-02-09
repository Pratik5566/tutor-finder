//filtering the tutors
import React, { useState } from 'react';
import './tutor.css'; // Import the CSS file for styling
import { useAuth } from '../../../AuthContext';
import { Avatar, Button, Card, CardContent, TextField, Typography, createTheme, ThemeProvider, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import TutorRating from '../../Feedback/TutorRating';

const TutorFind = () => {
    const { authUser, isUser, isTutor } = useAuth();
    const [filters, setFilters] = useState({
        location: '',
        pinCode: '',
        city: '',
        state: '',
        subject: '',
        gender: '',
        offlineClasses: false,
        onlineClasses: false,
        board: '',
        Class: '',
        atMyHome: false,
        atTheirHome: false
    });
    const theme = createTheme({
        palette: {
            primary: {
                main: '#cfd2d4', // Green color for text, border, and label
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputLabel-root': {
                            color: "#cfd2d4", // Default label color
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: '#cfd2d4', // Bottom line color when not focused
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#cfd2d4', // Bottom line color when focused
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#cfd2d4', // Border color
                            },
                            '&:hover fieldset': {
                                borderColor: '#cfd2d4', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#cfd2d4', // Border color when focused
                            },
                            '& input': {
                                color: "#cfd2d4", // Input text color
                            },
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        '& MuiSelect-root': {
                            color: "#cfd2d4"
                        }
                        // color: '#cfd2d4', // Select text color
                    },
                    icon: {
                        color: '#cfd2d4', // Select icon color
                    },
                    outlined: {
                        borderColor: '#cfd2d4', // Default border color
                        '&:hover': {
                            borderColor: '#cfd2d4', // Border color on hover
                        },
                        '&.Mui-focused': {
                            borderColor: '#000000', // Border color when focused
                        },
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: '#cfd2d4', // Checkbox color
                    },
                },
            },
        },
    });
    const [filteredTutors, setFilteredTutors] = useState([]);
    const applyFilter = async (e) => {
        e.preventDefault();
        try {
            // Construct the query string based on filter criteria
            const queryString = new URLSearchParams(filters).toString();

            const response = await fetch(`http://localhost:5000/admin/filter?${queryString}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to apply filter');
            }

            // Parse the JSON data from the response
            const data = await response.json();
            // Update state with filtered tutors
            setFilteredTutors(data);
        } catch (error) {
            console.error('Error applying filter:', error.message);
            // Handle the error gracefully (e.g., display an error message to the user)
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const createRequest = async (tutor) => {
        try {
            // Make a POST request to create a request for the selected tutor
            const createRequestResponse = await fetch(`http://localhost:5000/api/student-requests/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: authUser._id,
                    tutorId: tutor._id,
                    studentName: authUser.name,
                    tutorName: tutor.name,
                }),
            });

            if (!createRequestResponse.ok) {
                throw new Error('Failed to create request');
            }

            alert('Request sent successfully');
        } catch (error) {
            console.error('Error creating request:', error);
            // Handle the error gracefully (e.g., display an error message to the user)
        }
    };

    return (
        <div className="tutor-card-container">
            <ThemeProvider theme={theme}>

                <div className="tutor-card">
                    <div className="filters">
                        <TextField fullWidth label="Location" name="location" value={filters.location} onChange={handleChange} />
                        <TextField fullWidth label="PinCode" name="pinCode" value={filters.pinCode} onChange={handleChange} />
                        <TextField fullWidth label="City" name="city" value={filters.city} onChange={handleChange} />
                        <TextField fullWidth label="State" name="state" value={filters.state} onChange={handleChange} />
                        <TextField fullWidth label="Subject" name="subject" value={filters.subject} onChange={handleChange} />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                name='gender'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filters.gender}
                                label="Gender"
                                onChange={handleChange}
                            >
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormGroup>
                            <FormControlLabel name='offlineClasses' onChange={handleChange} checked={filters.offlineClasses} control={<Checkbox />} label="Offline Classes" />
                        </FormGroup>
                        {filters.offlineClasses && (
                            <>
                                <FormGroup>
                                    <FormControlLabel name='atMyHome' onChange={handleChange} checked={filters.atMyHome} control={<Checkbox />} label="At My House" />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel name='atTheirHome' onChange={handleChange} checked={filters.atTheirHome} control={<Checkbox />} label="At Their Home" />
                                </FormGroup>
                            </>
                        )}
                        <FormGroup>
                            <FormControlLabel name='onlineClasses' onChange={handleChange} checked={filters.onlineClasses} control={<Checkbox />} label="Online Classes" />
                        </FormGroup>
                        <TextField fullWidth label="Board" name="board" value={filters.board} onChange={handleChange} />
                        <TextField fullWidth label="Class" name="Class" value={filters.Class} onChange={handleChange} />
                    </div>
                    <Button fullWidth size='large' className='SPD-drawer-2-button2' sx={{ color: "#1b1e23", backgroundColor: "#cfd2d4", marginTop: "2vh" }} onClick={applyFilter}> Apply Filter </Button>
                    {/* <button className='TF-btn' onClick={applyFilter}>Apply Filter</button> */}
                </div>
            </ThemeProvider>

            <div className="filtered-tutors">
                <h2>Filtered Tutors</h2>
                <div className='inner-filtered-tutors' style={{ overflowY: 'auto' }}>
                    {filteredTutors.map((tutor, index) => (
                        // <li key={index}>
                        // {/* {tutor.name} */ }
                        < div key={index} >
                            <Card sx={{ marginBottom: "1.5%", marginRight: "1%", backgroundColor: "#1b1e23", border: "2px solid #cfd2d4" }}>
                                <CardContent >
                                    <div className='tutorfind-Dashboard-Student'>
                                        <div>
                                            <Avatar alt={tutor.name} src="{request.Avatar}" sx={{ width: 45, height: 45 }}></Avatar>
                                            <div style={{ marginLeft: "1%" }}>
                                                <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#cfd2d4" }}>{tutor.name}</Typography>
                                            </div>
                                            <TutorRating tutorId={tutor._id} />
                                        </div>
                                        <Button onClick={() => { createRequest(tutor) }} sx={{
                                            // position: 'absolute', right: "5%",
                                            color: "#cfd2d4", marginTop: "1.2vh",
                                            ":hover": {
                                                border: "1px solid white"
                                            }
                                        }} >Send Request</Button>
                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

            </div >
        </div >
    );
};

export default TutorFind;
