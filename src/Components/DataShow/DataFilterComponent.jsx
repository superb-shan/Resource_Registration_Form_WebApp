import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SettingsBackupRestore } from '@mui/icons-material';
import Calendar from './Calendar';
import CustomCollapsible from './CustomCollapsible';

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
        
      <Box sx={{ width: 400, borderRadius: 3, display: "flex", flexDirection: "column", height: 300, overflowY: "auto", overflowX: "clip" }}>
        {filterData.map((filterGroup, index) => (
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", mb:2 }} key={index}>
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
