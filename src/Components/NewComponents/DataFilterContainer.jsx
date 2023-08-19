import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SettingsBackupRestore } from '@mui/icons-material';
import Calendar from './Calendar';

const DataFilterContainer = ({...props}) => {

    const handleAllButton = () => {
        props.setSelectedDate(null); 
        props.setCustomActiveStatusFilter(null);
        props.setCustomActiveTypeFilter(null);
      };

    const handleCustomTypeFilter = async (event) => props.setCustomActiveTypeFilter(event.target.name);
    const handleCustomStatusFilter = async (event) => props.setCustomActiveStatusFilter(event.target.name);


  return (
    <div className='flex flex-col items-center gap-4 p-2 py-0 justify-center'>
        <Button 
        variant="contained"
        size="small" 
        sx={{ height: '30px',width:'350px', display:"flex", gap: 1, fontSize: "14px"}}
        onClick={handleAllButton}
        >
        <span>Reset Data</span>
        <SettingsBackupRestore sx={{width:"18px"}} />
        </Button>
        
        
        <Calendar selectedDate= {props.selectedDate} setSelectedDate= {props.setSelectedDate} />
        
        
        {/* //an mui box with  two columns with 1st column having 6 buttons vertically aligned and 2nd column having 3 buttons */}
        <Box sx={{ width: 400, borderRadius: 3 }}>
          <Typography sx={{mb: 1}}>Custom Filters</Typography>
          <Box sx={{display: "flex", gap: 5}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
              <Button variant={props.customActiveTypeFilter === "Transport" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Transport" onClick={handleCustomTypeFilter}>Transport</Button>
              <Button variant={props.customActiveTypeFilter === "Seminar" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Seminar" onClick={handleCustomTypeFilter}>Seminar</Button>
              <Button variant={props.customActiveTypeFilter === "GuestHouse" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "GuestHouse" onClick={handleCustomTypeFilter}>GuestHouse</Button>
              <Button variant={props.customActiveTypeFilter === "Items" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Items" onClick={handleCustomTypeFilter}>Items</Button>
              <Button variant={props.customActiveTypeFilter === "Event/poster" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Event/poster" onClick={handleCustomTypeFilter}>Event/Poster</Button>
              <Button variant={props.customActiveTypeFilter === "Food" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Food" onClick={handleCustomTypeFilter}>Food</Button>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
              <Button variant={props.customActiveStatusFilter === "Pending" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Pending" onClick={handleCustomStatusFilter}>Pending</Button>
              <Button variant={props.customActiveStatusFilter === "Success" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Success" onClick={handleCustomStatusFilter}>Success</Button>
              <Button variant={props.customActiveStatusFilter === "Rejected" ? 'contained' : 'outlined'} sx={{height: "30px"}} name = "Rejected" onClick={handleCustomStatusFilter}>Rejected</Button>
            </Box>
          </Box>
        </Box>
      </div>
  )
}

export default DataFilterContainer
