import { Box } from '@mui/material'
import React from 'react'

const AnalyticsContainer = ({children, ...props}) => {
  return (
    <Box sx={{  backgroundColor: 'white', width: '95vw', borderRadius:1.5, padding: '20px', display: "flex", justifyContent:'start', flexDirection: 'column', gap: '30px', m: "30px",}}>
        { children }
    </Box>
  )
}

export default AnalyticsContainer
