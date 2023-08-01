import React, { useContext } from 'react'
import LoginSelector from './LoginUserSelector'
import { Button } from '@mui/material';
import { LoginInputFields } from './LoginInputFields';
import axios from 'axios';
import { LoginContext } from '../../Context/Login.Context';

export const LoginContainer = () => {

  const {userName, password, setIsLoggedIn, isLoggedIn} = useContext(LoginContext);

  const handleLogin = async () => {
    const res = await axios.get('http://localhost:8000/user/Login', { params: { name: userName, password: password  } });
    const loginStatus = res.data.message;
    if (loginStatus !== true){
      alert("Invalid username or Password");
      setIsLoggedIn(false);
    }
    else{
      setIsLoggedIn(true);
    }

  }

  return (
    <div className='bg-white h-[500px] w-[500px] border rounded-2xl flex justify-evenly items-center flex-col shadow-2xl'>
        <p className='text-4xl'>Login</p>
        <LoginSelector />
        <LoginInputFields />
        <div>
            <Button variant={"contained"} sx={{width: "100px"}} onClick={handleLogin} color={isLoggedIn? "success": "primary"}>Login</Button>
        </div>
    </div>
  )
}
