import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SettingsBackupRestore } from '@mui/icons-material';
import Calendar from './Calendar';

const DataFilterComponent = ({...props}) => {

  const filterData = props.filterData;
  const handleAllButton = () => {
    props.setSelectedDate(null); 
    filterData.forEach((filterGroup) => {
      filterGroup.setValue(null);
    });
  };

    
  return (
    <div className='flex flex-col items-center gap-4 p-2 py-0 justify-center mx-auto'>
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
        
      <Box sx={{ width: 400, borderRadius: 3, display: "flex", justifyContent: "space-evenly" }}>
        {filterData.map((filterGroup, index) => (
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }} key={index}>
            <Typography sx={{ mb: 0.5 }} fontSize={14}>
              {filterGroup.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filterGroup.filters.map((filter) => (
                <Button
                  key={filter}
                  variant={filterGroup.value === filter ? "contained" : "outlined"}
                  sx={{ height: "30px" }}
                  name={filter}
                  onClick={() => filterGroup.setValue(filter)}
                >
                  {filter}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      </div>
  )
}

export default DataFilterComponent
