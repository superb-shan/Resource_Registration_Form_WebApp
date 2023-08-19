import { Box } from '@mui/material'
import React from 'react'

const DataViewContainer = ({children, ...props}) => {
  return (
    <Box sx={{ height: {xs: "auto", md:"82vh"}, width: "95vw", backgroundColor: 'white', borderRadius:1.5, padding: 1, display: "flex", flexDirection: {xs: "column-reverse", md: "row"}, m: "auto"}}>
        { children }
    </Box>
  )
}

export default DataViewContainer
