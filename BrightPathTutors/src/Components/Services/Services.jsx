import React from 'react'
import Container3 from '../HomePage/FadeUp/Container3/Container3'
import { Typography } from '@mui/material'
import './Services.css'
import FadeUp from '../HomePage/FadeUp/FadeUp'
import Container6 from '../HomePage/FadeUp/Container6/Container6'
import img1 from '../../assets/localtutoring.png'
import img2 from '../../assets/onlinetutoring.jpg'
import img3 from '../../assets/subjectsearch.jpg'
import img4 from '../../assets/homework.jpg'
const Services = () => {
    return (
        <div>
            
            <div style={{ paddingTop: "2%", backgroundColor: "#C7C8CC",borderRadius:"15px" }}>

                <Container3 />
            </div>
            <FadeUp>
                <div className="Services">

                    <div className="Services-left">
                        <img src={img1} alt="" />
                    </div>
                    <div className="Services-right">
                        <Typography sx={{ fontFamily: "Quicksand", fontWeight: "700", fontSize: '1.5rem', marginBottom: "3%" }}>Local Tutoring</Typography>
                        <Typography>At BrightPathTutors, we offer local tutoring services that provide students with personalized attention from experienced tutors. We understand that each student has unique learning needs and preferences, and our tutors work closely with them to identify their strengths and weaknesses, develop personalized study plans, and help them achieve their academic goals. Our one-on-one sessions allow students to ask questions and get individualized feedback, ensuring they understand the concepts and are confident in their abilities. With our local tutoring services, students can improve their grades, boost their confidence, and unlock their full potential.</Typography>
                    </div>

                </div>
            </FadeUp>
            <FadeUp>
                <div className="Services">

                    <div className="Services-left">
                        <Typography sx={{ fontFamily: "Quicksand", fontWeight: "700", fontSize: '1.5rem', marginBottom: "3%" }}>Online Tutoring</Typography>
                        <Typography>At BrightPathTutors, we offer online tutoring services that provide students with flexible and convenient options to get personalized attention from experienced tutors. Our online tutoring platform allows students to connect with tutors from anywhere in the world, from the comfort of their own homes. Our tutors are experienced in their respective subjects and are passionate about helping students achieve their academic goals. They work closely with students to identify their strengths and weaknesses, develop personalized study plans, and provide one-on-one guidance to help them overcome their challenges. With our online tutoring services, students can improve their grades, boost their confidence, and unlock their full potential, all while learning from the comfort of their own homes.
                        </Typography>
                    </div>
                    <div className="Services-right">
                    <img src={img2} alt="" />

                    </div>

                </div>
            </FadeUp>
            <FadeUp>
                <div className="Services">
                    <div className="Services-left">
                    <img src={img3} alt="" />

                    </div>
                    <div className="Services-right">
                        <Typography sx={{ fontFamily: "Quicksand", fontWeight: "700", fontSize: '1.5rem', marginBottom: "3%" }}>Subject Search</Typography>
                        <Typography>At BrightPathTutors, we understand that finding the right tutor can be a challenge. That’s why we offer a subject search feature that makes it easy for students to find and connect with experienced tutors in their respective subjects. Our subject search allows students to browse tutor profiles, read reviews, and compare prices, all in one convenient place. With our subject search feature, students can find the academic support they need, without the hassle of searching multiple websites or directories.
                        </Typography>
                    </div>
                </div>
            </FadeUp>
            <FadeUp>
                <div className="Services">
                    <div className="Services-left">
                        <Typography sx={{ fontFamily: "Quicksand", fontWeight: "700", fontSize: '1.5rem', marginBottom: "3%" }}>Homework Help</Typography>
                        <Typography>At BrightPathTutors, we offer homework help services that provide students with the support they need to complete their assignments and develop a deeper understanding of the material. Our tutors are experienced in a variety of subjects and are passionate about helping students succeed. They work closely with students to identify their homework assignments, review the material, and provide individualized guidance to help them complete their assignments and improve their grades. With our homework help services, students can stay on top of their coursework, develop a deeper understanding of the material, and achieve their academic goals.
                        </Typography>
                    </div>
                    <div className="Services-right">
                        <img src={img4} alt="" />
                    </div>
                </div>
            </FadeUp>
            <FadeUp>
                <div style={{backgroundColor:"#C7C8CC"}}>
                <Container6 />
                </div>
            </FadeUp>

        </div>
    )
}

export default Services
