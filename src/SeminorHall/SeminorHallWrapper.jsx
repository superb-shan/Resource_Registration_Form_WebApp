import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import SeminorHallForm from './SeminorHallForm'

function SeminorHallWrapper() {
  return (
    <div className='flex justify-center flex-col items-center bg-fixed bg-[#1976d2] pt-10'>
      <p style={{color: "#ffffff", textAlign:"center", fontSize:"2rem"}}> Seminor Hall Booking</p>
      <div className='bg-white m-auto my-10 p-10 w-[500px] border rounded-2xl flex items-center flex-col shadow-2xl'>
      <SeminorHallForm />
          <Button variant={"contained"} sx={{ marginTop: "2.5rem"}}> click here</Button>
      </div>
    </div>
  
  )
}

export default SeminorHallWrapper
