import React from 'react'
import "./Widgets.css"
import { useState, useEffect } from 'react';


const Widgets = ({ type }) => {
  const [count, setCount] = useState(0);
  // console.log(type)

  // Fetch user count from backend when the component mounts
  const fetchUserCount = async () => {
    try {
      console.log(type)
      
      const response = await fetch(`http://localhost:5000/admin/${type}/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }); // Assuming your backend is running on the same host as your frontend
      if (!response.ok) {
        throw new Error('Failed to fetch user count');
      }
      console.log(response)
      const { count } = await response.json();
      setCount(count);

    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  }


  useEffect(() => {
    fetchUserCount();
  }, [type]);

  let data;
  console.log(type)
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        count: count
      };
      break;
    case "tutor":
      data = {
        title: "TUTORS",
        count: count

      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
      </div>
    </div>
  )
}

export default Widgets
