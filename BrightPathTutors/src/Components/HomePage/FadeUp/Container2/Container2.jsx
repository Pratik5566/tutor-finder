import React from 'react'
import { Typography } from '@mui/material'
import "./Container2.css"
const Container2 = () => {
    return (
        <div className='lowerContainer'>
            {/* <Typography sx={{ fontSize: "1.5rem",margin:"0 43%" }}><h1> Courses</h1></Typography> */}
            <div className='lowerContainer2'>
                <div className='lowerContainer3'>
                    {/* eslint-disable-next-line react/no-danger */}
                    <Typography sx={{ fontSize: "1.2rem", }}><h3 className='container2-h3'>Tutoring</h3></Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>All our courses are</Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>available for you</Typography>


                </div>
                <div className='lowerContainer3'>
                    <Typography sx={{ fontSize: "1.2rem", }}><h3>Academic Coaching</h3></Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>All our courses are</Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>available for you</Typography>
                </div>
                <div className='lowerContainer3'>
                    <Typography sx={{ fontSize: "1.2rem", }}><h3>Homework Help</h3></Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>All our courses</Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>available for</Typography>
                </div>
                <div className='lowerContainer3'>
                    <Typography sx={{ fontSize: "1.2rem", }}><h3>Test Preparation</h3></Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>All our courses are</Typography>
                    <Typography sx={{ fontSize: "1.1rem", }}>available for you</Typography>

                </div>
            </div>
        </div>

    )
}

export default Container2;

