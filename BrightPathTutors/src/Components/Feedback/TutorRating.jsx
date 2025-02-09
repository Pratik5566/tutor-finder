import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Typography } from '@mui/material';

const TutorRating = ({ tutorId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/feedback/tutor-average-rating/${tutorId}`);
        const { averageRating } = response.data;
        setAverageRating(averageRating);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching average rating:', error);
        setLoading(false);
      }
    };

    fetchAverageRating();
  }, [tutorId]);

  const calculateFilledStars = () => {
    const filledStars = Math.floor(averageRating); // Get the whole number part
    const hasHalfStar = averageRating % 1 !== 0; // Check if there's a half star

    return (
      <div className="rating-stars">
        {[...Array(5)].map((star, index) => {
          if (index < filledStars) {
            return <StarIcon key={index} className="star filled" style={{ color: '#ffd700' }} />;
          } else if (hasHalfStar && index === filledStars) {
            return <StarHalfIcon key={index} className="star half-filled" style={{ color: '#ffd700' }} />;
          } else {
            return <StarOutlineIcon key={index} className="star" style={{ color: '#ffd700' }} />;
          }
        })}
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="tutor-rating-container">
      {/* <p>Average Rating:</p> */}
      {calculateFilledStars()}
      <Typography sx={{ fontSize: 16, fontWeight: 400, color: "#cfd2d4" }}>{averageRating.toFixed(1)} out of 5.0</Typography>
    </div>
  );
};

export default TutorRating;
