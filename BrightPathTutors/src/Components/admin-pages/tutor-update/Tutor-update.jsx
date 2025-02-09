
import './tutorupdate.css'
import { useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom';  
import React from 'react';

import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import { useTheme } from '../contextprovider/ThemeContext'

const TutorUpdate = () => {
  const { isDarkMode } = useTheme();


  const [data,setData]=useState({
    name:"",
    email:"",
    subject:""
  });
 
const params=useParams();

//get single user data
const getSingleTutorData=async ()=>{
  try {
   const response = await  fetch(`http://localhost:5000/admin/tutors/${params.id}`,{
     method: "GET",
     headers: {
      "Content-Type": "application/json"
  }
     });

   
    
     const tutorData = await response.json();
     setData(tutorData);

    

    } catch (error) {
   console.log(error);
  }

};



useEffect(() => { 
  getSingleTutorData();
  }, [params.id]);


const handleInput = (e) => {
  const { name, value } = e.target;
  setData(prevData => ({
    ...prevData,
    [name]: value 
  }));
};

  
//to upadte data dynamically



const handleSubmit=async(e)=>
{
  e.preventDefault();
  try {

    const response=await fetch(`http://localhost:5000/admin/tutors/update/${params.id}`,{
      method: "PATCH",
      headers: {
       "Content-Type": "application/json"
   },
   body:JSON.stringify(data),
      }
     
  
      
      );
      if (response.ok)
      {
        alert("updated successfully")
      }
      else{
        alert("updated unsuccessfully")
      }    

    
  } catch (error) {
    console.log(error);
  }
  
}





  return (
    <>
 <div className={`list ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
    
   
      <div className='container'>
 <section className="section-contact">
  <div className='container grid grid-two-cols'>
    <section className='section-form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="name" id="username" autoComplete='off' value={data.name} onChange={handleInput }  required />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" autoComplete='off' value={data.email} onChange={e=>setData({...data,email:e.target.value})} required />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" name="subject" id="subject" autoComplete='off' value={data.subject} onChange={handleInput }  required />
        </div>
        <div>
          <button className='TU-btn3' type='submit'>Submit</button>
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
export default TutorUpdate;
//onChange={e=>setData({...data,name:e.target.value})} 