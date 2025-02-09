import React from "react";
import "./Navbar.css"
//import TextField from '@mui/material/TextField';
//import SearchIcon from '@mui/icons-material/Search';
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import { lightBlue} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import { DarkModeContext } from "../../context/darkModeContext";
import { useTheme } from '../contextprovider/ThemeContext';

const Navbar = () => {
  //const { dispatch } = useContext(DarkModeContext);
  const { isDarkMode, toggleTheme } = useTheme();


  return (
    <>
    <div className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="wrapper">
      
        <div className="items">
          <div className="item">
          <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item " onClick={toggleTheme}>
            <DarkModeOutlinedIcon
              className="icon"
             
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>

          <div className="item">
          <Avatar sx={{ bgcolor: lightBlue[200], height:30 ,width:30}}className="icon" >
            <AccountCircleIcon/>
        
      </Avatar>
             
          </div>

          
        </div>
      </div>

    </div>
    
    
    </>
  )
}

export default Navbar
