import { Typography } from '@mui/material';
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

export const AccountManagerContainer = ({ children, ...props}) => {

  return (
    <div className='bg-white border rounded-2xl flex justify-evenly items-center flex-col shadow-2xl gap-10 p-10'>
      <Typography variant='h4'>{props.title}</Typography>
      { children }
    </div>
  )
}
