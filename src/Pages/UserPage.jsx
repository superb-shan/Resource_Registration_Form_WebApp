import React from 'react'
import UserProvider from '../Context/User.Context'
import UserWrapper from '../User/UserWrapper'
import { LoginContext } from '../Context/Login.Context'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';

export const UserPage = () => {


    const {isLoggedIn} = useContext(LoginContext);

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/" />;
    }

  return (
    <UserProvider>
        <UserWrapper />
    </UserProvider>
  )
}
