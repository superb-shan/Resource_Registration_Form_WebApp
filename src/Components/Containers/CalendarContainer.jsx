import { Box } from '@mui/material'
import React from 'react'

const CalendarContainer = ({children, ...props}) => {
  return (
    <Box sx={{  backgroundColor: 'white', borderRadius:1.5, padding: 1, display: "flex", justifyContent:'center',alignItems:'center', flexDirection: {xs: "column", md: "row"}, m: "auto"}}>
        { children }
    </Box>
  )
}

export default CalendarContainer
