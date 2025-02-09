import React from 'react'
import { Tab, Button, Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RedditIcon from '@mui/icons-material/Reddit';
import './Container6.css';
const Container6 = () => {
    

return (
    <div className='Container6-inner'>
        <Typography sx={{ fontFamily: "Quicksand", fontWeight: "600", fontSize: '1.5rem' }}>Self-Developement can be fun</Typography>
        <div className='Container6-inner-1'>
            <Button sx={{color:"black",margin:"0 1% 0 1%",":hover":{backgroundColor:"lightgray"}}} ><InstagramIcon sx={{fontSize:"2.0rem"}} /></Button>
            <Button sx={{color:"black",margin:"0 1% 0 1%",":hover":{backgroundColor:"lightgray"}}}> <FacebookIcon sx={{fontSize:"2.0rem"}}/> </Button>
            <Button sx={{color:"black",margin:"0 1% 0 1%",":hover":{backgroundColor:"lightgray"}}}><RedditIcon sx={{fontSize:"2.0rem"}}/></Button>
            <Button sx={{color:"black",margin:"0 1% 0 1%",":hover":{backgroundColor:"lightgray"}}}><YouTubeIcon sx={{fontSize:"2.0rem"}}/></Button>
            <Button sx={{color:"black",margin:"0 1% 0 1%",":hover":{backgroundColor:"lightgray"}}}> <XIcon sx={{fontSize:"2.0rem"}}/> </Button>
        </div>
    </div>
)
}

export default Container6;
