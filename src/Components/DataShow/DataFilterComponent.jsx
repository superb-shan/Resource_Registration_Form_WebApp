import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SettingsBackupRestore } from '@mui/icons-material';
import Calendar from './Calendar';
import CustomCollapsible from './CustomCollapsible';
import { Typography } from '@mui/material';

const DataFilterComponent = ({...props}) => {

  const filterData = props.filterData;
  const handleAllButton = () => {
    props.setSelectedDate(null); 
    filterData.forEach((filterGroup) => {
      filterGroup.setValue(null);
    });
    props.fetchData();
  };

    
  return (
    <div className='flex flex-col items-center gap-4 pl-2 py-0 justify-start mx-auto'>
      <Button 
      variant="contained"
      size="small" 
      sx={{ height: '30px',width:'350px', display:"flex", gap: 1, fontSize: "14px"}}
      onClick={handleAllButton}
      >
      <span>Reset Filters</span> 
      <SettingsBackupRestore sx={{width:"18px"}} />
      </Button>

      {/* Filter data */}
        
      <Box sx={{ width: 400, borderRadius: 3, gap: 1, display: "flex", flexDirection: "column", height: "full", overflowY: "auto", overflowX: "clip" }}>
        <CustomCollapsible title={"Filter by Date"} isOpen={true} isCalendar={true} >
          <Calendar selectedDate= {props.selectedDate} setSelectedDate= {props.setSelectedDate} />
        </CustomCollapsible>
        {filterData.map((filterGroup, index) => (
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }} key={index}>
            <CustomCollapsible title={filterGroup.title} isOpen={filterGroup.isOpen} toggle={() => filterGroup.isOpen = !filterGroup.isOpen}>
              {/* Content to display when the collapsible section is expanded */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {filterGroup.filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={filterGroup.value === filter ? 'contained' : 'outlined'}
                    sx={{ height: '30px' }}
                    name={filter}
                    onClick={() => filterGroup.setValue(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </Box>
            </CustomCollapsible>
          </Box>
        ))}
      </Box>

      </div>
  )
}

export default DataFilterComponent
