import React from 'react'
import { useContext } from 'react';
import { LoginContext } from '../Context/Login.Context';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Button } from '@mui/material';
import {AccountCircle, VisibilityOff, Visibility, Mail, Done} from '@mui/icons-material';


export const CreateUserPage = () => {

  const {user, isLoggedIn} = useContext(LoginContext);
  const [newUserName, setNewUserName] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  useEffect(()=>{}, [newUserName, newPassword, confirmPassword ]);

  if(!isLoggedIn && user !== 'admin'){
      toast.info("You are not logged in as a Admin");
      return (<Navigate to={'/'} />);
  }

  const isValidPassword = (password) => {
    const requirements = [];
    if (password.length < 8) requirements.push("Password must be at least 8 characters long.");
    if (!/[a-z]/.test(password)) requirements.push("Include at least one lowercase letter.");
    if (!/[A-Z]/.test(password)) requirements.push("Include at least one uppercase letter.");
    if (!/\d/.test(password)) requirements.push("Include at least one digit.");
    if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password)) requirements.push("Include at least one special character.");
    return requirements;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleNewPasswordChange = (event) => {setNewPassword(event.target.value);};
  const handleNewUserNameChange = (event) => setNewUserName(event.target.value);
  const handleNewEmailChange = (event) => setNewEmail(event.target.value);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleConfirmPasswordChange = (event) => {setConfirmPassword(event.target.value);};


  const handleLogin = async (event) => {

    event.preventDefault();
    console.log(newPassword, confirmPassword);
    if (newPassword !== confirmPassword){
        toast.info('Please enter the same password');
        return;
    }
    if (newUserName === "" || newEmail === "" || newPassword === "" || confirmPassword === ""){
        toast.info('Fields cannot be empty!');
        return;
    }

    //! Strong Password Check
    // const passwordRequirements = isValidPassword(newPassword);
    // if (passwordRequirements.length > 0) {
    //     toast.info(passwordRequirements.join(" "));
    //     return;
    // }

    //! EMail Validation
    if (!isValidEmail(newEmail)) {
        toast.info("Please provide a valid email");
        return;
    }


    const res = await axios.post("http://localhost:8000/user/create", { name: newUserName, email: newEmail,  password: newPassword  } );
    const loginStatus = res.data.message;
    if (loginStatus === "success"){
      setIsCreated(true);
      setNewUserName('');
      setNewEmail('');
      setConfirmPassword('');
      setNewPassword('');
      toast.success("New user Created");
      setTimeout(()=> {setIsCreated(false)}, 3000);
    }else{
      toast.warn(loginStatus);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-[#1976d2]'>
        <div className='bg-white w-[500px] border rounded-2xl flex justify-evenly items-center flex-col shadow-2xl gap-10 p-10'>
            <p className='text-4xl'>Create a new User</p>
            <div className='flex flex-col gap-10 items-center w-[300px]'>

            <TextField id="outlined" label="New User Name" variant="outlined" 
                InputProps={{
                    endAdornment: <InputAdornment position="end"> <AccountCircle /> </InputAdornment>
                }}
                value={newUserName}
                onChange={handleNewUserNameChange}
                sx={{ width: '300px' }}
            />

            <TextField id="outlined" label="Email" variant="outlined" 
                InputProps={{
                    endAdornment: <InputAdornment position="end"> <Mail /> </InputAdornment>
                }}
                value={newEmail}
                onChange={handleNewEmailChange}
                sx={{ width: '300px' }}
            />

            <FormControl sx={{ width: '300px' }} variant="outlined">
            
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput            
                    id="outlined-adornment-password"
                    type={showNewPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="New Password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
            </FormControl>

            <FormControl sx={{ width: '300px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password-2">Confirm Password</InputLabel>
                <OutlinedInput            
                    id="outlined-adornment-password-2"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
            </FormControl>

            <Button variant={"contained"} sx={{paddingLeft: "20px", paddingRight: "20px"}} onClick={handleLogin} color={isCreated? "success": "primary"} endIcon={isCreated?<Done />:<></>}>{isCreated? "Created" : "Create"}</Button>
            </div>
        </div>
    </div>
  )
}
