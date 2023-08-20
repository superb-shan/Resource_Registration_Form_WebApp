import React, {useEffect } from 'react'
import { Wrapper } from './Wrapper'
import NavBar from './NavBar'
import { useContext } from 'react';
import { LoginContext } from '../../Context/Login.Context';
import { useNavigate } from 'react-router-dom';
import Bookings from './Bookings';
import { UserContext } from '../../Context/User.Context';
import Forms from './Forms';

 const UserPage = () => {

  const navigate = useNavigate();
  const {isLoggedIn} = useContext(LoginContext);
  const {selectedView} = useContext(UserContext);

    
  useEffect(()=>{
    if (!isLoggedIn) {
      navigate("/");
    } 
  },[isLoggedIn, navigate]);

  return (
    <Wrapper alignment="start">
      <NavBar title={'Resource Registration'} />
      {
        selectedView === "My Bookings"? 
          <Bookings />
      : 
        selectedView === "Add Bookings"? 
          <Forms />
      :
        null
      }
    </Wrapper>
  )
}

export default UserPage;
