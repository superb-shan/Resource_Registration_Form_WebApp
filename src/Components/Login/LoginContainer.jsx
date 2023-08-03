import React, { useContext } from 'react'
import LoginSelector from './LoginUserSelector'
import { Button } from '@mui/material';
import { LoginInputFields } from './LoginInputFields';
import axios from 'axios';
import { LoginContext } from '../../Context/Login.Context';
import { Navigate } from 'react-router-dom';

export const LoginContainer = () => {

  const {user, userName, password, setIsLoggedIn, isLoggedIn} = useContext(LoginContext);

  // useEffect(()=> {
  //   if (user === 'user' && isLoggedIn){
  //     navigate('/user');
  //    }
  // }, [isLoggedIn, user])
  if (isLoggedIn){
    return (<Navigate to={ user==="user"? "/user": "/admin"} />);
  }

  // if (user === 'user' && isLoggedIn){
  //   // navigate('/user');
  //   return <Navigate to='/user' />
  //  }

  const handleLogin = async (event) => {

    event.preventDefault();
    const res = await axios.get(`http://localhost:8000/${user}/Login`, { params: { name: userName, password: password  } });
    const loginStatus = res.data.message;
    if (loginStatus !== true){
      alert("Invalid username or Password");
      setIsLoggedIn(false);
    }
    else{
      setIsLoggedIn(true);
      console.log(user);
      console.log(isLoggedIn);
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
