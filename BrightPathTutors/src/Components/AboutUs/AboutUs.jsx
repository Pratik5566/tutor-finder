import React from 'react'
import { Typography, Button } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './AboutUs.css'
import FadeUp from '../HomePage/FadeUp/FadeUp'
import Container6 from '../HomePage/FadeUp/Container6/Container6'
const AboutUs = () => {
    return (
        <div>
            <FadeUp>

                <div className='AboutUs-Container1'>
                    <Typography sx={{ fontFamily: "Quicksand", fontWeight: "400", marginBottom: "3%" }}><h1>About</h1></Typography>
                </div>
            </FadeUp>
            <FadeUp>


                <div className="AboutUs-MiddleContainer">
                    <Typography sx={{ fontFamily: "Quicksand", fontWeight: "700", fontSize: '1.5rem', marginBottom: "3%" }}>Our Vision</Typography>
                    <Typography sx={{ fontFamily: "Quicksand", fontWeight: "400", fontSize: '1.0rem', marginBottom: "3%" }}>Our vision at BrightPathTutors is to empower students to reach their full potential through personalized learning experiences. We believe that every student has unique needs and learning styles that require individual attention. Our goal is to provide expert tutors who can tailor their teaching methods to meet those needs and foster a love of learning. We envision a future where every student has access to quality education and achieves academic success.
                    </Typography>
                    <Typography sx={{ fontFamily: "Quicksand", fontWeight: "400", fontSize: '1.0rem', marginBottom: "3%" }}>Let’s talk</Typography>
                    <Typography sx={{ fontFamily: "Quicksand", fontWeight: "700", fontSize: '1.0rem', marginBottom: "3%" }}>contact@domain.com</Typography>
                    <div>
                        <Button sx={{ color: "white", backgroundColor: "black", padding: "5px", minWidth: "2%", marginRight: "0.5%", ":hover": { backgroundColor: "lightgray" } }} ><InstagramIcon sx={{ fontSize: "1.5rem" }} /></Button>
                        <Button sx={{ color: "white", backgroundColor: "black", padding: "5px", minWidth: "2%", marginRight: "0.5%", ":hover": { backgroundColor: "lightgray" } }} ><FacebookIcon sx={{ fontSize: "1.5rem" }} /></Button>
                        <Button sx={{ color: "white", backgroundColor: "black", padding: "5px", minWidth: "2%", marginRight: "0.5%", ":hover": { backgroundColor: "lightgray" } }} ><XIcon sx={{ fontSize: "1.5rem" }} /></Button>
                        <Button sx={{ color: "white", backgroundColor: "black", padding: "5px", minWidth: "2%", marginRight: "0.5%", ":hover": { backgroundColor: "lightgray" } }} ><LinkedInIcon sx={{ fontSize: "1.5rem" }} /></Button>


                    </div>
                </div>
            </FadeUp>
            <FadeUp>


                <div className="AboutUs-LowerContainer">

                    <div className="Services-left">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="Services-right">
                        <Typography sx={{ fontFamily: "Quicksand", fontWeight: "700", fontSize: '1.5rem', marginBottom: "3%" }}>Team Story</Typography>
                        <Typography>At BrightPathTutors, we are committed to providing personalized learning experiences to help students achieve their academic goals. Our team of expert tutors is passionate about education and has a wealth of experience in teaching. We believe in a student-centric approach, tailoring our curriculum to meet the unique needs of each student. Our innovative teaching methods encourage active learning and foster a love of learning. We are dedicated to helping students reach their full potential and take pride in their success.

                        </Typography>
                    </div>
                </div>
            </FadeUp>
            <FadeUp>
                <div className='AboutUs-Footer'>
                <Container6/>
                </div>
            </FadeUp>

        </div>
    )
}

export default AboutUs
