import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext.jsx';
import { Avatar, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AcceptedTutorsList = () => {
    const [acceptedTutors, setAcceptedTutors] = useState([]);
    const { authUser, isUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAcceptedTutors = async () => {
            try {
                if (authUser._id) {
                    const response = await axios.get(`http://localhost:5000/api/feedback/accepted-tutors/${authUser._id}`);
                    // Check if response.data is an array before setting state
                    console.log(response)
                    if (Array.isArray(response.data)) {
                        setAcceptedTutors(response.data);
                    } else {
                        console.error('Invalid data received:', response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching accepted tutors:', error);
            }
        };
        // Fetch tutors when authUser._id changes
        if (isUser) {
            fetchAcceptedTutors();
        }
    }, [authUser, isUser]); // Include authUser and isUser in the dependency array

    const handleFeedback = (tutorId, tutorName) => {
        navigate("/feedbackstudent", { state: { tutorId, tutorName } });
    };

    return (
        <div>
            <h2>Tutors who have accepted your request:</h2>
            
                {acceptedTutors.map((tutor) => (
                    <Card  key={tutor.tutorId} sx={{ marginBottom: "1%", marginRight: "1%", backgroundColor: "#1b1e23", border: "2px solid #2b2e33" }}>
                        <CardContent>
                            <div className='Dashboard-Student'>
                                <Avatar alt={tutor.tutorName} src="{request.Avatar}" sx={{ width: 45, height: 45 }}></Avatar>
                                <div style={{ marginLeft: "1%" }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#cfd2d4" }}>{tutor.tutorName}</Typography>
                                    {/* <Typography sx={{ fontSize: 14, color: "#787c7f" }}>Sent {formatTimeAgo(request.created_at)}</Typography> */}
                                </div>
                                <Button sx={{
                                    position: 'absolute', right: "5%", color: "#cfd2d4", marginTop: "1.2vh",
                                    ":hover": {
                                        border: "1px solid white"
                                    }
                                }} onClick={() => handleFeedback(tutor.tutorId, tutor.tutorName)}>Feedback</Button>
                            </div>
                        </CardContent>

                    </Card>
                ))}
                
        </div>
    );
};

export default AcceptedTutorsList;
