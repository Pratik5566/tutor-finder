import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from "./Components/Header/Header"
import "./App.css"
import Services from "./Components/Services/Services";
import HomePage from "./Components/HomePage/HomePage";
import AboutUs from "./Components/AboutUs/AboutUs";
import StudentProfileDashboard from "./Components/StudentProfileDashboard/StudentProfileDashboard";
import Login from "./Components/Login/Login";
import LoginTutor from "./Components/Login/LoginTutor";
import FeedbackForm from "./Components/Feedback/FeedbackForm";
import AcceptedTutorsList from "./Components/Feedback/AcceptedTutorsList";
import Home from "./Components/admin-pages/home/Home";
import TutorFind from "./Components/admin-pages/tutorfilter/TutorFind";
import Add_User from "./Components/admin-pages/Add_User/Add_User";
import StudentProfile from "./Components/admin-pages/user-profile/StudentProfile";
import Admin_users from "./Components/admin-pages/Admin_users/Admin_users";
import User_update from "./Components/admin-pages/User_Update/User_update";
import Tutorlist from "./Components/admin-pages/Tutor-list/Tutorlist";
import TutorUpdate from "./Components/admin-pages/tutor-update/Tutor-update";
import NewTutor from "./Components/admin-pages/newtutor/NewTutor";
import Dashboard from "./Components/dashboard/Dashboard";
import Payment from "./Components/Payment/Payment";
import Register from "./Components/RegisterPage/Register";
import PaymentSuccess from "./Components/Payment/PaymentSuccess";
import ContactUs from "./Components/ContactUs/ContactUs";
import Faq from "./Components/FAQ/Faq";
import { useAuth } from "./AuthContext";

function App() {


  const { isLoggedIn, isUser, isTutor, isAdmin } = useAuth();

  return (
    <div>
      <Router>
        <Header className="header" />
        {isAdmin && (
            <>
        <Routes>
          {/* Admin Panel */}
          <Route path="/admin/home" element={<Home />}></Route>
          <Route path="/admin/users" >
            <Route index element={<Admin_users />} />
            <Route path="/admin/users/:id" element={<User_update />} />
            <Route path="/admin/users/new" element={<Add_User />} />
            <Route path="/admin/users/profile/:id" element={<StudentProfile />}></Route>
          </Route>
          <Route path="/admin/tutors" >
            <Route index element={<Tutorlist />} />
            <Route path="/admin/tutors/:id" element={<TutorUpdate />} />
            <Route path="/admin/tutors/new" element={<NewTutor />} />
          </Route>
        </Routes>
        </>
         )}
        <div className="App-container">
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/about"} element={<AboutUs />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/feedback"} element={<AcceptedTutorsList />} />
            <Route path={"/feedbackstudent"} element={<FeedbackForm />} />
            <Route path={"/contact-us"} element={<ContactUs />} />
            <Route path={"/faq"} element={<Faq />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/logintutor"} element={<LoginTutor />} />
            <Route path={"/order"} element={<Payment />} />
            <Route path={"/profile"} element={<StudentProfileDashboard />} />
            <Route path={"/register"} element={<Register/>} />
            <Route path={"/services"} element={<Services />} />
            <Route path="/tutorfind" element={<TutorFind />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
