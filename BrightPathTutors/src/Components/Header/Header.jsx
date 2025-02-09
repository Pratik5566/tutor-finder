import React, { useState } from 'react';
import { Typography, AppBar, Toolbar, Tab, Tabs, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';

// import { useAuth0 } from "@auth0/auth0-react";
function Header() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn,authUser,setIsLoggedIn ,logout } = useAuth();
  // const { loginWithRedirect, logout, user } = useAuth0();
  const currentUrl = window.location.pathname;
  // Check if the current URL is the profile page
  const isProfilePage = currentUrl === '/profile';
  const isAdmin = window.location.pathname.startsWith('/admin');
  ;

  const handleLogout = () => {
    // Call the logout function provided by useAuth
    logout();

    // Redirect the user to the login page
    navigate('/');
  };
  
  return (
    <>
    {!(isProfilePage || isAdmin) && (
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black"}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'start' }}>
            BrightPathTutors
          </Typography>
          <Box sx={{ flexGrow: 0.5, display: 'flex', justifyContent: 'center' }}>
            <Tabs textColor='inherit' value={value} onChange={(e, newValue) => { setValue(newValue) }} TabIndicatorProps={{ style: { backgroundColor: "#B9B4C7" } }} >
              <Tab label="Home" onClick={() => { navigate("/") }} />
              <Tab label="Services" onClick={() => { navigate("/services") }} />
              <Tab label="About" onClick={() => { navigate("/about") }} />
              <Tab label="Contact Us" onClick={() => { navigate("/contact-us") }}/>
              <Tab label="FAQ" onClick={() => { navigate("/faq") }} />
            </Tabs>
          </Box>
          <div style={{ flexGrow: .5 ,display: "flex", alignItems: "center", justifyContent: "flex-end", width: "20%" }}>
            {isLoggedIn &&
              <>
                <Button variant="outlined" sx={{ backgroundColor: "" }} onClick={() => { navigate("/dashboard") }} >Dashboard</Button>
                <Avatar style={{ margin: "0px 20px" }} alt={authUser.name} src={authUser.picture} onClick={() => { navigate("/profile") }} sx={{ ":hover": { backgroundColor: "black", cursor: 'pointer', boxShadow: "0 0 15px rgba(33,33,33,.7)" } }} />
                <Button variant="contained" sx={{ backgroundColor: "black" }} onClick={handleLogout}>Log out</Button>
              </>
            }
            {!isLoggedIn &&
              <Button variant="contained" sx={{
                backgroundColor: "black", color: "white",fontFamily:"Quicksand",fontWeight:"700",
                ":hover": {
                    bgcolor: "#C0C0C0",
                    color: "black"
                }, border: "1px solid black"
            }} onClick={() => { navigate('/login') }}>Login</Button>
            }
          </div>
        </Toolbar>
      </AppBar>
    )}
  </>
);
}

export default Header;