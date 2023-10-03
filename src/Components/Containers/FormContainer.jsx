import { Typography } from '@mui/material';
import React from 'react'

const FormContainer = ({children, padding='10', width='800px', ...props}) => {
  return (
    <>
      <Typography variant='h4' sx={{my: 3, textAlign: 'center', color: "white"}}>{props.title}</Typography>
      <div className={`bg-white mx-auto mt-5 mb-4 py-10 px-${padding} w-[${width}] [@media(max-width:600px)]:w-[500px] border rounded-2xl flex flex-wrap gap-x-20 gap-y-8 justify-evenly items-center shadow-md shadow-inner-md`}>
          {children}
      </div>
    </>
  )
}

export default FormContainer;