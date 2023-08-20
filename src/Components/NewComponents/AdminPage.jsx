import React, {useState, useEffect, useCallback } from 'react'
import { Wrapper } from './Wrapper'
import NavBar from './NavBar'
import { useContext } from 'react';
import { LoginContext } from '../../Context/Login.Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Bookings from './Bookings';


 const AdminPage = () => {

  const navigate = useNavigate();
  const {user, isLoggedIn} = useContext(LoginContext);

  
  useEffect(()=>{
    if (user !== 'admin') {
      toast.info("You are not an Admin");
      navigate("/");
    } 
  },[isLoggedIn, navigate]);

  return (
    <Wrapper alignment="start">
      <NavBar title={'Resource Registration'} />
      <Bookings />
    </Wrapper>
  )
}

export default AdminPage;
