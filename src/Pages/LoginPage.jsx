import React, { useContext } from 'react'
import { Wrapper } from '../Components/Wrappers/Wrapper';
import { AccountManagerContainer } from '../Components/Containers/AccountManagerContainer';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Selector, TextInput, PasswordInput } from '../Components/Fields/InteractionFields';
import { LoginContext } from '../Context/Login.Context';
import { AccountCircle } from '@mui/icons-material';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {

  const navigate = useNavigate();
  const { user,
          setUser,
          userName, 
          setUserName, 
          password, 
          setPassword,
          isLoggedIn,
          setIsLoggedIn 
        } = useContext(LoginContext);

  const handleLogin = async (event) => {

    event.preventDefault();
    const res = await axios.get(`/${user}/Login`, { params: { name: userName, password: password  } });
    const loginStatus = res.data.message;
    if (loginStatus !== true){
      toast.error("Username/Password is Incorrect");
      setIsLoggedIn(false);
      sessionStorage.setItem("isLoggedIn", false);
    }
    else{
      setIsLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", true);
      toast.success(`Logged in as ${user.toUpperCase()}` )
      navigate(`/${user}`);
    }

  }
  
  useEffect(()=>{
    // Empty block to prevent using of previous states, useEffects ensures that the current state is in the var
  },[userName, password]);

  try{return (
    <Wrapper alignment="center" >
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
  )}catch(err){
    console.log(err);
  }
}

export default LoginPage;
