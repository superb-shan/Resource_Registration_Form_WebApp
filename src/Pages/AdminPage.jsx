import React from 'react'
import AdminWrapper from '../Components/Admin/AdminWrapper'
import { LoginContext } from '../Context/Login.Context'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';

export const AdminPage = () => {

    const {isLoggedIn, user} = useContext(LoginContext);

    if(!isLoggedIn && user !== 'admin'){
        return (<Navigate to={'/'} />);
    }

  return (
    <div>
        <AdminWrapper/>
    </div>
  )
}
