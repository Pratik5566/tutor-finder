import React,{useState} from "react";
import "./mix.css"
import "./header.css"
import {Card} from '@mui/material';
import { NavLink } from  "react-router-dom";
//import {Button} from '@mui/material';


const Register=()=>{
        const[passShow,setPassShow]=useState(false);
        const[conpassShow,setConPassShow]=useState(false);
        
        const [inpval,setInpval]=useState({
            fname:"",
            email:"",
            password:"",
            cpassword:""
        });
        //changed value
        console.log(inpval);
        //returns the value written in fields  
              const setVal=(e)=>{
           // console.log(e.target.value);
                const {name,value}=e.target;
                setInpval(()=>{
                    return{
                        ...inpval,
                        [name]:value
                    }
                })


        }
        //validation
        const addUSerData= async (e)=>{
            e.preventDefault();

            const {fname,email,password,cpassword}=inpval;

            if(fname=== ""){
                alert("please enter your name");
            }
            else if(email === ""){
                alert("please enter your email");
            }
            else if(!email.includes("@")){
                alert("enter valid email")
            }else if(password === ""){
                alert("enter your password")
            }else if(password.length<8){
                alert("password must be 6 char")
            }
            else if(cpassword.length<8){
                alert("password must be 6 char")
            }else if(cpassword === ""){
                alert("enter your password")
            }else if(password !== cpassword)
            {
                alert("password and confirm password does not match")
            }
            else{
                //console.log("user registration done successfully");
//connecting with backend api
                const data= await fetch("/register",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        fname,email,password,cpassword
                    })

                

                });
                const res=await data.json();
                console.log(res.status);
                //console.log(res);
                if(res.status === 201){
                   alert("user registration done");
                    setInpval({...inpval, fname :"", email :"",password: "",cpassword: ""});
                }
            }

        }
    return(
        <center>
            < Card variant={"outlined"} style={{width:400,padding:20,marginTop:120}}>
        <div >
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p>
                            Hi,we are you glad you are back.Please login.
                        </p>
                    </div>

                   <form>


                   <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <div className="two">
                            <input type="text" onChange={setVal}  value={inpval.fname} name="fname" id="fname" placeholder="Enter your name"  ></input>
                            </div>

                        </div>


                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <div className="two">
                            <input type="email" name="email" id="email" placeholder="Enter your email address" onChange={setVal}  value={inpval.email} ></input>
                            </div>

                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                            <input type={!passShow ? "password" : "text"} name="password" id="password" placeholder="Enter your password" onChange={setVal}  value={inpval.password}   ></input>
                            <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                {!passShow ?"Show" : "Hide"}
                            </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                            <input type={!conpassShow ? "password" : "text"} name="cpassword" id="cpassword" placeholder="Confirm Password "  onChange={setVal}   value={inpval.cpassword}  ></input>
                            
                            <div className="showpass" onClick={()=>setConPassShow(!conpassShow)}>
                                {!conpassShow ?"Show" : "Hide"}
                            </div>
                            </div>
                        </div>





                        
                    <button className="btn" onClick={addUSerData}>Sign up</button>

                    <p>Already have an accont?< NavLink to="/" > login</NavLink></p>
                    </form> 
                </div>
            </section>
        </div>
        </Card>
        </center>
    )
}

export default Register