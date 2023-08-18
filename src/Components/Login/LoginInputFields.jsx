import React, { useEffect } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import {AccountCircle, VisibilityOff, Visibility} from '@mui/icons-material';
import { useContext } from 'react';
import { LoginContext } from '../../Context/Login.Context';
import { useState } from 'react';

export const LoginInputFields = () => {

    const {userName, setUserName, password, setPassword} = useContext(LoginContext);

    const [showPassword, setShowPassword] = useState(false);
    useEffect(()=>{
        // Empty block to prevent using of previous states, useEffects ensures that the current state is in the var
    },[userName, password]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleUserNameChange = (event) => {setUserName(event.target.value); };
    const handlePasswordChange = (event) => {setPassword(event.target.value); console.log(password)};

  return (
    <div>
        <div className='flex flex-col gap-10 w-[300px]'>
        <TextField id="outlined-basic" label="User Name" variant="outlined" 
            InputProps={{
                endAdornment: <InputAdornment position="end"> <AccountCircle /> </InputAdornment>
            }}
            value={userName}
            onChange={handleUserNameChange}
        />

          {/*Password  */}
        <FormControl sx={{ width: '300px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput            
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
                value={password}
                onChange={handlePasswordChange}
            />
        </FormControl>
        </div>
    </div>
  )
}
