import React,{useState} from "react";
import "./mix.css"
import "./header.css"
import {Card} from '@mui/material';
import { NavLink,useNavigate  } from  "react-router-dom";//




const Login=()=>{
        const[passShow,setPassShow]=useState(false);
        //const [email,setemail]=React.useState();
        //const [pwd,setpwd]=React.useState();

        const [inpval,setInpval]=useState({
            
            email:"",
            password:"",
            
        });

        const history=useNavigate();

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
        const loginuser=async (e)=>{
            e.preventDefault();

            const {email,password}=inpval;

           
             if(email === ""){
                alert("please enter your email");
            }
            else if(!email.includes("@")){
                alert("enter valid email")
            }else if(password === ""){
                alert("enter your password")
            }else if(password.length<8){
                alert("password must be 6 char")
            }
           
            else{
               // console.log("user registration done successfully");
               const data= await fetch("/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,password
                })

            

            });
            const res=await data.json();
            console.log(res)
            
           if(res.status === 201){

              
            if (res.result.userValid) {
                localStorage.setItem("userdatatoken", res.result.token);
                alert("User login successful");
                history("/home");
              } else if (res.result.tutorValid) {
                localStorage.setItem("tutordatatoken", res.result.token);
                alert("Tutor login successful");
                history("/tutorfind");
              }
               setInpval({...inpval,  email :"",password: ""});
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
                        <h1>Welcome Back, Log In</h1>
                        <p>
                            Hi,we are you glad you are back.Please login.
                        </p>
                    </div>

                   <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <div className="two">
                            <input type="email" name="email" id="email" placeholder="Enter your email address" onChange={setVal} value={inpval.email} ></input>
                            </div>

                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                            <input type={!passShow ? "password" : "text"} name="password" id="password" placeholder="Enter your password" onChange={setVal} value={inpval.password}></input>
                            <div className="showpass" onClick={()=>setPassShow(!passShow)}>
                                {!passShow ?"Show" : "Hide"}


                            </div>
                            </div>
                            

                        </div>
                        
                    <button className="btn" onClick={loginuser}>Login</button>

                    <p>Dont have an account? <NavLink to="/register">sign up</NavLink> </p>
                    <br></br>
                    <button className="login-with-google-btn">Sign in with Google</button>
                    </form> 

                    
                </div>
            </section>
        </div>
        </Card>
    

            
        </center>
    )
}
export default Login