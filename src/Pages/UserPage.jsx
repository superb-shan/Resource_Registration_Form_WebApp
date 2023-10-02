import React, { useEffect } from 'react'
import { Wrapper } from '../Components/Wrappers/Wrapper'
import NavBar from '../Components/Navbar/NavBar'
import { useContext } from 'react';
import { LoginContext } from '../Context/Login.Context';
import { useNavigate } from 'react-router-dom';
import Bookings from '../Components/DataShow/Bookings';
import { UserContext } from '../Context/User.Context';
import Forms from '../Components/Forms/Forms';
import CheckAvailabilityView from '../Components/CheckAvailability/CheckAvailabilityView';
import { toast } from 'react-toastify';
import CalendarView from '../Components/Calender/CalendarView';


const UserPage = () => {

  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(LoginContext);
  const { selectedView } = useContext(UserContext);


  console.log("user", user, "res", !user === "user");
  useEffect(() => {
    if (user !== "user") {
      console.log("inside");
      toast.warn("Your are not logged in as a user");
      navigate("/");
    }
  }, [user, isLoggedIn, navigate]);

  return (
    <Wrapper alignment="start">
      <NavBar title={'Resource Registration'} />
      {
        selectedView === "My Bookings" ?
          <Bookings />
          :
        selectedView === "Book" ?
          <Forms />
          :
        selectedView === "Calendar" ?
          <CalendarView />
          :
        <CheckAvailabilityView />
      }
    </Wrapper>
  )
}

export default UserPage;
