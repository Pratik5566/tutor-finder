import React from 'react'
import { Button, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
//import Container5 from '../HomePage/FadeUp/Container5/Container5';
import Container6 from '../HomePage/FadeUp/Container6/Container6';
import FadeUp from '../HomePage/FadeUp/FadeUp';
import './ContactUs.css'
const ContactUs = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000', //  color for text, border, and label
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        // '& .MuiInputLabel-root': {
                        //     color: "#000000", // Default label color
                        // },
                        // '& .MuiInput-underline:before': {
                        //     borderBottomColor: '#000000', // Bottom line color when not focused
                        // },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#000000', // Bottom line color when focused
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgb(183, 182, 182)', // Border color
                            },
                            // '&:hover fieldset': {
                            //     borderColor: '#000000', // Border color on hover
                            // },
                            '&.Mui-focused fieldset': {
                                borderColor: '#000000', // Border color when focused
                            },
                            '& input': {
                                color: "#000000", // Input text color
                            },
                        },
                    },
                },
            },
        },
    });
    return (
        <div>
            <div className="contactus-container1 contactus-item">
                <Typography sx={{ fontWeight: 400, fontSize: 40, marginBottom: "1%", color: "#413F42" }}># Let's Talk </Typography>
            </div>
            <div className="contactus-container2 contactus-item">
                
                <div className="contactus-container2-1" >
                    <Typography sx={{ fontWeight: 400, fontSize: 13, marginBottom: "1%", color: "#413F42" }}>GET IN TOUCH</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 25, marginBottom: "2%" }}>Visit one of our agency location or contact us today</Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: 15, marginBottom: "2%" }}>Head Office</Typography>
                    <div className="contactus-container2-1-1">
                        <div className="contactus-item">
                            <BusinessIcon sx={{ fontSize: "1.1rem", marginRight: "2%", color: "#413F42" }} />
                            <Typography sx={{ fontWeight: 400, fontSize: 15, color: "#413F42" }}>56 glassford street glasgow G1 1UL New YORK</Typography>
                        </div>
                        <div className="contactus-item">
                            <EmailIcon sx={{ fontSize: "1.1rem", marginRight: "2%", color: "#413F42" }} />
                            <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: "1%", color: "#413F42" }}>pdevesh699@gmail.com</Typography>
                        </div>
                        <div className="contactus-item">
                            <LocalPhoneIcon sx={{ fontSize: "1.1rem", marginRight: "2%", color: "#413F42" }} />
                            <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: "1%", color: "#413F42" }}>90*******2</Typography>
                        </div>
                        <div className="contactus-item">
                            <AccessTimeIcon sx={{ fontSize: "1.1rem", marginRight: "2%", color: "#413F42" }} />
                            <Typography sx={{ fontWeight: 400, fontSize: 15, marginBottom: "1%", color: "#413F42" }}>Monday to Saturday: 9.00 am to 16.00 pm</Typography>
                        </div>
                    </div>


                </div>
                <div className="contactus-container2-2">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.4695638849485!2d80.94020487442272!3d26.85681856249226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0a819131cb%3A0x11553d04f3a32d9c!2sNational%20Post%20Graduate%20College!5e0!3m2!1sen!2sin!4v1712471226205!5m2!1sen!2sin" style={{ border: 0, maxWidth: "55vw", minWidth: "55vw", maxHeight: "75vh", minHeight: "65vh" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className="contactus-container3">
                <ThemeProvider theme={theme}>
                    <div className='contactus-container3-1 contactus-item'>

                        <Typography sx={{ fontWeight: 400, fontSize: 13, marginBottom: "1%", color: "#413F42" }}>LEAVE A MESSAGE</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: 25, marginBottom: "2%" }}>We Love to Hear from you</Typography>

                        <TextField fullWidth label="Your Name" variant="outlined" sx={{ marginBottom: "1%" }} />
                        <TextField fullWidth label="Email" variant="outlined" sx={{ marginBottom: "1%" }} />
                        <TextField fullWidth label="Subject" variant="outlined" sx={{ marginBottom: "1%" }} />
                        <TextField fullWidth label="Your Message" multiline rows={4} variant="outlined" sx={{ marginBottom: "1%" }} />
                        <Button sx={{
                            borderRadius: "15px", backgroundColor: "black", width: "10%", marginTop: "2%", color: "white", ":hover": {
                                color: "black",
                                backgroundColor: "white",
                                border:"1px solid black"
                            }
                        }}>Submit</Button>
                    </div>
                </ThemeProvider>
            </div>
           {/*/<FadeUp>

            <Container5 />
            </FadeUp> /*/}
            <FadeUp> 

            <Container6 />
            </FadeUp>
        </div>
    )
}

export default ContactUs
