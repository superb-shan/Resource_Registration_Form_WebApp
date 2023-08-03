import React from 'react'
import AdminWrapper from '../Components/Admin/AdminWrapper'
import { LoginContext } from '../Context/Login.Context'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const AdminPage = () => {

    const {isLoggedIn, user} = useContext(LoginContext);

    if(!isLoggedIn && user !== 'admin'){
        return (<Navigate to={'/'} />);
    }else{
      toast.success("Logged in to Admin")
    }

  return (
    <div>
        <AdminWrapper/>
    </div>
  )
}
