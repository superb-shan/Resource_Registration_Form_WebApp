import React, {useEffect } from 'react'
import { Wrapper } from '../Components/Wrappers/Wrapper'
import NavBar from '../Components/Navbar/NavBar'
import { useContext } from 'react';
import { LoginContext } from '../Context/Login.Context';
import { useNavigate } from 'react-router-dom';
import Bookings from '../Components/DataShow/Bookings';
import { UserContext } from '../Context/User.Context';
import Forms from '../Components/Forms/Forms';
import CheckAvailabilityView from '../Components/CheckAvailability/CheckAvailabilityView';

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
         <CheckAvailabilityView />
      }
    </Wrapper>
  )
}

export default UserPage;
