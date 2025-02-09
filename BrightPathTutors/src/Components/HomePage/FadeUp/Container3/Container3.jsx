import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import "./Container3.css"


const Container3 = props => {
    return (
        <>
            <div className="Container3-upperContainer">
                <Typography sx={{ fontSize: "1.5rem", textAlign:'center' }}><h1 style={{
                    marginTop: 0
                }}
                > Services We Provide</h1></Typography>
            </div>
            <div className="Container3-lowerContainer">
                <div className="Container3-lowerContainer1">

                    <div className="Container3-lowerContainer1-1">
                        <Typography sx={{ fontSize: "1.5rem", }}><h3> Local Tutoring</h3></Typography>
                        <Typography> <h5>Our local tutoring services provide personalized attention to students, helping them achieve their academic goals and improve their grades through one-on-one sessions with experienced tutors</h5></Typography>
                    </div>


                    
                        <div className="Container3-lowerContainer1-1">
                            <Typography sx={{ fontSize: "1.5rem", }}><h3> Online Tutoring</h3></Typography>
                            <Typography> <h5>Our online tutoring services offer flexible and convenient options for students to get personalized attention from experienced tutors, from the comfort of their own homes.</h5></Typography>
                        </div>
                    
                </div>
                <div className="Container3-lowerContainer2">

                    
                        <div className="Container3-lowerContainer1-1">
                            <Typography sx={{ fontSize: "1.5rem", }}><h3> Subject Search</h3></Typography>
                            <Typography> <h5>Our subject search feature allows students to easily find and connect with experienced tutors in their respective subjects, making it simple to get the academic support they need.</h5></Typography>
                        </div>
                    
                    
                        <div className="Container3-lowerContainer1-1">
                            <Typography sx={{ fontSize: "1.5rem", }}><h3> Homework Help</h3></Typography>
                            <Typography> <h5>Our homework help services provide students with the support they need to complete their assignments and develop a deeper understanding of the material.</h5></Typography>

                       </div>
                    
                </div>


            </div>
        </>
    )
}

Container3.propTypes = {

}

export default Container3
