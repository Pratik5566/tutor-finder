import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useLocation } from 'react-router-dom';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuth();
  const location = useLocation();

  // Extract tutorId and tutorName from location state
  const { tutorId, tutorName } = location.state || {};

  useEffect(() => {
    // Fetch existing feedbacks of the student
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        if (authUser && authUser._id) {
          const response = await axios.get(`http://localhost:5000/api/feedback/feedbacks/${authUser._id}`);
          setFeedbacks(response.data);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [authUser, tutorId]); // Added tutorId to trigger re-fetch when tutorId changes

  useEffect(() => {
    // Check if student has already submitted feedback for this tutor
    const existingFeedback = feedbacks.find((feedback) => feedback.tutor === tutorId);
    if (existingFeedback) {
      setIsEditing(true);
      setEditId(existingFeedback._id);
      setRating(existingFeedback.ratings[0]); // Assuming only one rating for simplicity
      setFeedbackText(existingFeedback.feedback[0]); // Assuming only one feedback for simplicity
    } else {
      setIsEditing(false);
      setEditId(null);
      setRating(0);
      setFeedbackText('');
    }
  }, [feedbacks, tutorId]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing && editId) {
        // If editing an existing feedback
        await axios.put(`http://localhost:5000/api/feedback/feedback/${editId}`, {
          rating: rating,  // Send rating directly, not in an array
          feedback: feedbackText,  // Send feedback directly, not in an array
        });
        setRating(0);
        setFeedbackText('');
        alert('Feedback updated successfully!');
        // Fetch updated feedbacks after submission
        const response = await axios.get(`http://localhost:5000/api/feedback/feedbacks/${authUser._id}`);
        setFeedbacks(response.data);
      } else {
        // If sending new feedback
        const existingFeedbackIndex = feedbacks.findIndex((feedback) => feedback.tutor === tutorId);
        if (existingFeedbackIndex !== -1) {
          // Remove previous feedback for this tutor
          const updatedFeedbacks = [...feedbacks];
          updatedFeedbacks.splice(existingFeedbackIndex, 1);
          setFeedbacks(updatedFeedbacks);
        }

        await axios.post('http://localhost:5000/api/feedback/feedback', {
          student: authUser._id,
          studentName: authUser.name,
          tutor: tutorId,
          tutorName: tutorName,
          rating: rating,  // Send rating directly, not in an array
          feedback: feedbackText,  // Send feedback directly, not in an array
        });
        setRating(0);
        setFeedbackText('');
        alert('Feedback submitted successfully!');
        // Fetch updated feedbacks after submission
        const response = await axios.get(`http://localhost:5000/api/feedback/feedbacks/${authUser._id}`);
        setFeedbacks(response.data);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleEditFeedback = (id, prevRating, prevFeedback) => {
    // Set state to enable editing of the feedback
    setIsEditing(true);
    setEditId(id);
    setRating(prevRating);
    // Instead of replacing entire feedback, populate the textarea with existing feedback
    setFeedbackText(prevFeedback);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="feedback-feedback-form-container">
      <div className="feedback-form-container">
        <h2>Give Feedback for {tutorName}</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <div className="feedback-rating-container">
            <p>Rate us out of 5:</p>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={index}
                  className={ratingValue <= rating ? 'feedback-filled-star' : 'feedback-star'}
                  onClick={() => handleRatingChange(ratingValue)}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
          <textarea
            className="feedback-textarea"
            placeholder="Write your feedback here..."
            value={feedbackText}
            onChange={handleFeedbackTextChange}
          ></textarea>
          <button type="submit" className="feedback-submit-btn">{isEditing ? 'Edit Feedback' : 'Submit Feedback'}</button>
        </form>

        <h2>Your Feedbacks:</h2>
        <div className="feedbacks-list">
          {feedbacks
            .filter((feedback) => feedback.tutor === tutorId) // Filter by tutorId
            .map((feedback) => (
              <div key={feedback._id} className="feedback-item">
                <p>Rating: {feedback.ratings[0]}</p>
                <p>Feedback: {feedback.feedback[0]}</p>
                {/* <button onClick={() => handleEditFeedback(feedback._id, feedback.ratings[0], feedback.feedback[0])}>
                  Edit
                </button> */}
              </div>
            ))}
        </div>

      </div>
    </div>

  );
};

export default FeedbackForm;
