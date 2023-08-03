import React from 'react'
import UserProvider from '../Context/User.Context'
import UserWrapper from '../User/UserWrapper'
import { LoginContext } from '../Context/Login.Context'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const UserPage = () => {

    const {isLoggedIn} = useContext(LoginContext);

    
      if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/" />;
      } else {
        toast.success("Logged in to User")
      }
    

  return (
    <UserProvider>
        <UserWrapper />
    </UserProvider>
  )
}
