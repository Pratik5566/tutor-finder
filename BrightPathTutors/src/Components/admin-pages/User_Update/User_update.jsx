
import React from 'react';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
//import { set } from 'mongoose';
import Sidebar from '../Sidebar/Sidebar'
import { useTheme } from '../contextprovider/ThemeContext'
import Navbar from '../navbar/Navbar'
import './User_update.css'

const User_update = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState({
    name: "",
    email: ""
  });

  const params = useParams();

  //get single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const userData = await response.json();
      setData(userData);
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    getSingleUserData();
  }, [params.id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }
      );
      if (response.ok) {
        alert("updated successfully")
      }
      else {
        alert("updated unsuccessfully")
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
      <div className={`list ${isDarkMode ? 'dark' : 'light'}`}>
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className='container'>
            <section className="section-contact">
              <div className='container grid grid-two-cols'>
                <section className='section-form'>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input type="text" name="name" id="username" autoComplete='off' value={data.name} onChange={handleInput} required />
                    </div>
                    <div>
                      <label htmlFor="email">email</label>
                      <input type="email" name="email" id="email" autoComplete='off' value={data.email} onChange={e => setData({ ...data, email: e.target.value })} required />
                    </div>
                    <div>
                      <button className='U-btn3' type='submit'>Submit</button>
                    </div>


                  </form>
                </section>
              </div>

            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_update;
//onChange={e=>setData({...data,fname:e.target.value})} 