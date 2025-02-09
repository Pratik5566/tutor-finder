import React from 'react'
import './Home.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import Widgets from '../widget/Widgets'
//ye lena hai
import { useTheme } from '../contextprovider/ThemeContext'


const Home = () => {
  const { isDarkMode } = useTheme();
  return (

    <div className={`home ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widgets type="user" />
          <Widgets type="tutor" />
        </div>

      </div>
    </div>
  )
}

export default Home;
//<Widgets type="courses"/>