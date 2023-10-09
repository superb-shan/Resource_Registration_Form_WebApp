import React, {useState, useEffect, useCallback } from 'react'
import { Wrapper } from '../Components/Wrappers/Wrapper'
import NavBar from '../Components/Navbar/NavBar'
import { useContext } from 'react';
import { LoginContext } from '../Context/Login.Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Bookings from '../Components/DataShow/Bookings';
import { UserContext } from '../Context/User.Context';
import CalendarView from '../Components/Calender/CalendarView';
import Analytics from '../Components/Analytics/Analytics';


 const AdminPage = () => {

  const navigate = useNavigate();
  const {user, isLoggedIn} = useContext(LoginContext);
  const {selectedView, setSelectedView} = useContext(UserContext);

  useEffect(()=>{
    setSelectedView('Calendar');
  }, []);
  console.log("ad", user);
  useEffect(()=>{
    if (user !== 'admin') {
      toast.info("You are not an Admin");
      navigate("/");
    } 
  },[isLoggedIn, navigate]);

  return (
    <Wrapper alignment="start">
      <NavBar title={'Easy Bookings'} />
      {
        selectedView === "Calendar"?
          <CalendarView />
        :
        selectedView === "Bookings" ?
          <Bookings />
        :
          <Analytics />
      }
      
    </Wrapper>
  )
}

export default AdminPage;
