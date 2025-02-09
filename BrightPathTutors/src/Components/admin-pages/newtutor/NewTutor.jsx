
import './Newtutor.css'

import React, { useState } from "react";

import { Card } from '@mui/material';
//import { NavLink } from  "react-router-dom";
//import {Button} from '@mui/material';
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import { useTheme } from '../contextprovider/ThemeContext'


const NewTutor = () => {
    const { isDarkMode } = useTheme();
    const [passShow, setPassShow] = useState(false);
    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        subject: "",
        password: "",
    });
    //changed value
    console.log(inpval);
    //returns the value written in fields  
    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })


    }
    //validation
    const addTutorData = async (e) => {
        e.preventDefault();

        const { name, email, subject, password } = inpval;

        if (name === "") {
            alert("please enter your name");
        }
        else if (subject === "") {
            alert("please enter your subject");
        }
        else if (email === "") {
            alert("please enter your email");
        }
        else if (!email.includes("@")) {
            alert("enter valid email")
        } else if (password === "") {
            alert("enter your password")
        } else if (password.length < 8) {
            alert("password must be 6 char")
        }

        else {
            //console.log("user registration done successfully");
            //connecting with backend api
            const data = await fetch("http://localhost:5000/admin/tutors/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, subject, password,
                })



            });
            const res = await data.json();
            console.log(res.status);
            console.log(res)
            //console.log(res);
            if (res.status === 201) {
                alert("tutor registration done");
                setInpval({ ...inpval, name: "", email: "", subject: "", password: "", });
            }
        }

    }
    return (
        <>

            <div className={`list ${isDarkMode ? 'dark' : 'light'}`}>
                <Sidebar />
                <div className="listContainer">
                    <Navbar />

                    <center>
                        < Card variant={"outlined"} style={{ width: 400, padding: 20, marginTop: 120 }}>
                            <div >
                                <section>
                                    <div className="form_data">


                                        <form>


                                            <div className="form_input">
                                                <label htmlFor="name">Name</label>
                                                <div className="two">
                                                    <input type="text" onChange={setVal} value={inpval.name} name="name" id="name" placeholder="Enter your name"  ></input>
                                                </div>

                                            </div>


                                            <div className="form_input">
                                                <label htmlFor="email">Email</label>
                                                <div className="two">
                                                    <input type="email" name="email" id="email" placeholder="Enter your email address" onChange={setVal} value={inpval.email} ></input>
                                                </div>

                                            </div>

                                            <div className="form_input">
                                                <label htmlFor="subject">Subject</label>
                                                <div className="two">
                                                    <input type="text" name="subject" id="subject" placeholder="Enter your subject" onChange={setVal} value={inpval.subject} ></input>
                                                </div>

                                            </div>

                                            <div className="form_input">
                                                <label htmlFor="password">Password</label>
                                                <div className="two">
                                                    <input type={!passShow ? "password" : "text"} name="password" id="password" placeholder="Enter your password" onChange={setVal} value={inpval.password}   ></input>
                                                    <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                                        {!passShow ? "Show" : "Hide"}
                                                    </div>
                                                </div>
                                            </div>

                                           






                                            <button className="NT-btn" onClick={addTutorData}>Submit</button>


                                        </form>
                                    </div>
                                </section>
                            </div>
                        </Card>
                    </center>
                </div>
            </div>

        </>
    )
}

export default NewTutor

