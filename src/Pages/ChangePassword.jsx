import React from 'react'
import { useContext } from 'react';
import { LoginContext } from '../Context/Login.Context';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Button } from '@mui/material';
import {AccountCircle, VisibilityOff, Visibility} from '@mui/icons-material';

export const ChangePassword = () => {

    const {user, userName, password, setPassword, setIsLoggedIn, isLoggedIn} = useContext(LoginContext);
    const [isUpdated, setIsUpdated] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(()=>{}, [newPassword, setNewPassword, confirmPassword, setConfirmPassword]);

      if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/" />;
      } 
      
      const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
      const handleMouseDownPassword = (event) => event.preventDefault();
      const handleNewPasswordChange = (event) => {setNewPassword(event.target.value); console.log(newPassword)};

      const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
      const handleConfirmPasswordChange = (event) => {setConfirmPassword(event.target.value); console.log(confirmPassword)};


      const handleLogin = async (event) => {

        event.preventDefault();
        console.log(newPassword, confirmPassword);
        if (newPassword !== confirmPassword){
            toast.error('Please enter the same password');
            return;
        }
        if (newPassword === "" || confirmPassword === ""){
            toast.error('Password cannot be empty!');
            return;
        }

        const res = await axios.patch(`http://localhost:8000/user/update`, { name: userName, password: newPassword  } );
        const loginStatus = res.data.message;
        if (loginStatus === true){   
           toast.success("Password Updated!");
          setIsLoggedIn(false);
        }
    
      }

  return (
    <div className='flex justify-center items-center h-screen bg-[#1976d2]'>
        <div className='bg-white h-[500px] w-[500px] border rounded-2xl flex justify-evenly items-center flex-col shadow-2xl'>
            <p className='text-4xl'>Change Password</p>
            <div className='flex flex-col gap-10 items-center w-[300px]'>

            <TextField id="outlined" label="User Name" variant="outlined" 
                InputProps={{
                    endAdornment: <InputAdornment position="end"> <AccountCircle /> </InputAdornment>
                }}
                value={userName}
                disabled
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


            <Button variant={"contained"} sx={{width: "100px"}} onClick={handleLogin} color={isUpdated? "success": "primary"}>Update</Button>
            </div>
        </div>
    </div>
  )
}
