import { FormControl } from '@mui/material'
import React from 'react'

const FormControlWrapper = ({ children }) => {
  return (
    <FormControl sx={{ width: '300px' }} variant="outlined" >
      { children }
    </FormControl>
  )
};

export default FormControlWrapper;
