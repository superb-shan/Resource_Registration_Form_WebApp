import React from 'react'
import UserContainer from './UserContainer'
import UserNavBar from './UserNavbar'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UserWrapper() {
  return (
      
      <div className=' bg-[#eff2f5]'>
        
        <UserNavBar />
        <UserContainer />
      </div>

  )
}

export default UserWrapper

