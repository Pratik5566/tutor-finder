// StudentProfile.js

import React from 'react';
import './StudentProfile.css';
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import { useTheme } from '../contextprovider/ThemeContext'


import  { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { isDarkMode } = useTheme();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/users/profile/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }


  return (
    <div className={`list ${isDarkMode ? 'dark' : 'light'}`}>
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
    <div className="profile-container">
      <div className="profile-card">
        
        <div className="details">
         
          <p className="profile-info"><strong>Name:</strong>  {user.name}</p>
          <p className="profile-info"><strong>Email</strong> {user.email}</p>
          
          <h2 className="contacted-teachers-title">Contacted Teachers</h2>
          <div className="teacher-list-container">
          <div className='contacted-teachers-list'> {user.tutorID && user.tutorID.map(tutor => (
                <li key={tutor._id} className="teacher-item">
                  <p className="teacher-name"><strong>Tutor Name:</strong> {tutor.name}</p>
                  <p className="teacher-email"><strong>Email:</strong> {tutor.email}</p>
                  <p className="teacher-subject"><strong>Tutor Specialization:</strong> {tutor.subject}</p>
                </li>
              ))}
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>

</div>  );
}

export default StudentProfile;
//overflow hidden, scrolable property