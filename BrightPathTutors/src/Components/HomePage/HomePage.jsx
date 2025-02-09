import React from 'react'
import ImageSlider2 from './ImageSlider/ImageSlider2'
import FadeUp from './FadeUp/FadeUp'
import {Typography } from '@mui/material'
import Container2 from './FadeUp/Container2/Container2'
import Container3 from './FadeUp/Container3/Container3'
import Container4 from './FadeUp/Container4/Container4'
import Container6 from './FadeUp/Container6/Container6'
import Container from './FadeUp/Container/Container'
import "./HomePage.css"

const HomePage = () => {
    return (
        <div>
            <ImageSlider2 />
            <div className="upperContainer1" >
                <FadeUp>
                    <Container />
                </FadeUp>
            </div>
            <div className="upperContainer2" >
                <FadeUp>
                    <Typography sx={{ fontSize: "1.5rem", margin: "0 44%" }}><h1 style={{
                        marginTop: 0,
                    }}
                    > Courses</h1></Typography>
                </FadeUp>
                <FadeUp>
                    <Container2 />
                </FadeUp>
            </div >
            <div className="thirdContainer">
                <FadeUp>
                    <Container3 />
                </FadeUp>
            </div>
            <FadeUp>
                <Container4 />
            </FadeUp>
            <div className="Container6-upper">
                <FadeUp>
                    <Container6 />
                </FadeUp>
            </div>
           
            
        </div>

    )
}

export default HomePage
