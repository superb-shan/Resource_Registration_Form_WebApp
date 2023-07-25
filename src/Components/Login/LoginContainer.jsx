import React from 'react'
import LoginSelector from './LoginUserSelector'
import { Button } from '@mui/material';
import { LoginInputFields } from './LoginInputFields';

export const LoginContainer = () => {
  return (
    <div className='bg-white h-[500px] w-[500px] border rounded-2xl flex justify-evenly items-center flex-col shadow-2xl'>
        <p className='text-4xl'>Login</p>
        <LoginSelector />
        <LoginInputFields />
        <div>
            <Button variant={"contained"} sx={{width: "100px"}}>Login</Button>
        </div>
    </div>
  )
}
