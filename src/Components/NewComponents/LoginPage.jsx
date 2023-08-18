import React, { useContext } from 'react'
import { Wrapper } from './Wrapper';
import { AccountManagerContainer } from './AccountManagerContainer';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Selector, TextInput, PasswordInput } from './InteractionFields';
import { LoginContext } from '../../Context/Login.Context';
import { AccountCircle } from '@mui/icons-material';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {

  const navigate = useNavigate();
  const { user, setUser, userName, setUserName, password, setPassword, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  useEffect(()=>{
    // Empty block to prevent using of previous states, useEffects ensures that the current state is in the var
  },[userName, password]);

  if (isLoggedIn){
    // return (<Navigate to={`/${user}`} />);
    navigate(`/${user}`);
  }

  const handleLogin = async (event) => {

    event.preventDefault();
    console.log("Inside handleLogin");
    const res = await axios.get(`/${user}/Login`, { params: { name: userName, password: password  } });
    const loginStatus = res.data.message;
    console.log("user", user, "status", loginStatus, "u-p", userName, password);
    if (loginStatus !== true){
      toast.error("Username/Password is Incorrect");
      setIsLoggedIn(false);
    }
    else{
      setIsLoggedIn(true);
      console.log("Success");
      // navigate(`/${user}`);
      // console.log(user);
      // console.log(isLoggedIn);
    }

  }

  return (
    <Wrapper>
      <AccountManagerContainer title = "Login" onSubmit = {handleLogin}>
          <Selector
            list={[
              { name: "user", adornment: <SupervisorAccountIcon /> },
              { name: "admin", adornment: <PersonOutlineIcon /> },
            ]}
            value={user}
            setValue={setUser}
          />
          <TextInput label={"User Name"} value={userName} setValue={setUserName} endAdornment={<AccountCircle/>} />
          <PasswordInput label={"Password"} value={password} setValue={setPassword} />
          <Button variant="contained" sx={{ width: "100px" }} type="submit" color={isLoggedIn ? "success" : "primary"}>Login</Button>
      </AccountManagerContainer>
    </Wrapper>
  )
}

export default LoginPage;
