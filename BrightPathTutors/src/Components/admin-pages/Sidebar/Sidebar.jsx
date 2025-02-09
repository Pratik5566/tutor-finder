import React from "react";
import "./Sidebar.css"

import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useTheme } from '../contextprovider/ThemeContext'; // 
import { useAuth } from "../../../AuthContext";
import Snapshot from "../snapshot/Snapshot";

const Sidebar = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    const handleLogout = () => {
        // Call the logout function provided by useAuth
        logout();
    
        // Redirect the user to the login page
        navigate('/');
      };

  return (
    <>
    <div className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="top">
            <span className="logo">Admin</span>
        </div>
        <hr/>
        <div className="center">
            <ul>
                <li><DashboardIcon className="icon"/>
                 <NavLink to="/admin/home" ><span >Dashboard</span></NavLink> 
                </li>
                <li><PersonIcon className="icon"/>
                <NavLink to="/admin/users"><span>Users</span></NavLink>
                </li>
                <li><PersonOutlineOutlinedIcon className="icon"/>
                <NavLink to="/admin/tutors">
                    <span>Tutors</span></NavLink>
                </li>
                
                <li><AccountCircleOutlinedIcon className="icon"/>
                    <span>Profile</span>
                </li>
                <li onClick={handleLogout}><LogoutRoundedIcon className="icon"/>
                    <span>Logout</span>
                </li>
                <li>
                    <Snapshot /> {/* Add the DownloadButton component */}
                </li>
                

                

            </ul>

        </div>
     




    </div>
 
    </>
  )
}

export default Sidebar
