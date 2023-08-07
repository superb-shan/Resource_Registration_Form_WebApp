
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useContext } from 'react';
import { SeminorContext } from '../../Context/Seminor.Context';
import { Box, Button, Chip, FormControl, Grid, InputLabel, List, ListItem, ListItemText, OutlinedInput, Select, Typography, useTheme, Demo, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import { Done } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const DemoX = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


function GuestHouseForm() {

  const theme = useTheme();

  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);

  const {
    name, setName,
    contactNumber, setContactNumber,
    DesignationDepartment, setDesignation,
    requiredHall,
    startDate,
    endDate,
    startTime,
    endTime,
    noOfAttendees,
    EquipmentRequired,
    specialRequirements,
    setHall,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setNoOfAttendees,
    setEquipmentNeeded,
    setSpecialRequirements,
    setPurpose,
    purpose,
    isAvailabilityChecked, 
    setIsAvailabilityChecked,
    unavailableHalls, 
    setUnavailableHalls
  } = useContext(SeminorContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };


  const handlehallChange = (event) => {
    setHall(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setHall('');
    setIsAvailabilityChecked(false);
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setHall('');
    setIsAvailabilityChecked(false);
    setEndDate(date);
  };

  const handleStartTimeChange = (time) => {
    setHall('');
    setIsAvailabilityChecked(false);
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setHall('');
    setIsAvailabilityChecked(false);
    setEndTime(time);
  };

  const handleNoOfAttendeesChange = (event) => {
    setNoOfAttendees(event.target.value);
  };


  const handleEquipmentNeededChange = (event) => {
    const {
      target: { value },
    } = event;
    setEquipmentNeeded(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSpecialRequirementsChange = (event) => {
    setSpecialRequirements(event.target.value);
  };

  const handlepurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleCheckAvailability = async() => {
    if (!startTime || !endTime){
      toast.warn("Please select a start and end time");
      return;
    }
    if (!startDate || !endDate){
      toast.warn("Please select a start and end time");
      return;
    }
    setIsAvailabilityLoading(true);
    const res = await axios.get("/seminar/checkAvailability", {params: {startDate: moment(startDate.toString()).format("YYYY-MM-DD"), endDate: moment(endDate.toString()).format("YYYY-MM-DD"), startTime: moment(startTime.toString()).format("HH:mm:ss"), endTime: moment(endTime.toString()).format("HH:mm:ss")}});
    console.log(res);
    setIsAvailabilityLoading(false);
    setIsAvailabilityChecked(true);
    setUnavailableHalls(res.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || []);
    // console.log(unavailableHalls);
  }

  const FoodRequied = [{
    value: "BreakFast",
    label: "BreakFast"

  }, {
    value: "Lunch",
    label: "Lunch"

  },
  {
    value: "Dinner",
    label: "Dinner"
  },
  {
    value: "Tea & Snacks",
    label: "Tea & Snacks"
  },
  ];


  const Room = [
    {
      value: 'Single Room',
      label:  'Single Room'
    },
    {
      value: 'Double Room',
      label: 'Double Room'
    },
    {
      value: 'Suite',
      label: 'Suite'
    }
  ];

  const Menu = [
    {
      value: 'Elite',
      label:  'Elite'
    },
    {
      value: 'Special',
      label: 'Special'
    },
    {
      value: 'Normal',
      label: 'Normal'
    }
  ];

  const Payment = [
    {
      value: 'Paid By Institution',
      label:  'Paid By Institution'
    },
    {
      value: 'Department',
      label: 'Department'
    },
    {
      value: 'Guest',
      label: 'Guest'
    }
  ];


  


  return (
    <div className='flex flex-wrap gap-8 justify-evenly items-center w-[800px] [@media(max-width:640px)]:w-[500px]'>
      {/* start datepicker*/}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} >
          <DatePicker
            sx={{width:"300px"}}
            label='Start Date *'
            views={['year', 'month', 'day']}
            disablePast
            value={startDate}
            onChange={handleStartDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>

      {/* end datepicker*/}


      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            sx={{width:"300px"}}
            label='End Date *'
            views={['year', 'month', 'day']}
            disablePast
            value={endDate}
            onChange={handleEndDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>

      {/* time picker start*/}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker
            sx={{width:"300px"}}
            label="Start Time *"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>

      {/* time picker end*/}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker
            sx={{width:"300px"}}
            label="End Time *"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>


      <Button variant="contained" sx={{width:"200px", height: "40px", mx: {xs: 0, md: "300px"}}} onClick={handleCheckAvailability} color={isAvailabilityChecked? "success" : "primary"} >{isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} /> : isAvailabilityChecked ? <Done/> : <>Check Availability</>  }</Button>

      {isAvailabilityChecked && 
      <Grid container spacing={2} sx={{textAlign: "center",backgroundColor: "#FFD966",  width: {xs:"400px", md:"720px"}, borderRadius: "10px", ml: {xs:0,md:1}}}>
        <Grid item xs={12} md={6} >
          <Typography variant="h6" component="div" >
            Available
          </Typography>
          <Box>
            <List>
              {Room.filter(room => !unavailableHalls.includes(room.value)).map((room) => <ListItemText primary={room.value} />)}
            </List>
          </Box>
        </Grid>
        <Divider orientation="horizontal" flexItem />
        <Grid item xs={12} md={5}>
          <Typography variant="h6" component="div">
            Not Available
          </Typography>
          <Box>
            <List>
              {unavailableHalls.map((room) => <ListItemText primary={room}/>)}  
            </List>
          </Box>
        </Grid>
      </Grid>
      }

      {/* hall required */}
      <TextField
        sx={{width:"300px"}}
        id="outlined-room-required-input"
        select
        label="Type of Room Requested*"
        placeholder='Select a Room from available for the selected slot'
        value={requiredHall}
        onChange={handlehallChange}
        disabled={!isAvailabilityChecked}
        title={isAvailabilityChecked? "" : "Check Availability to Enable"}
      >
        {Room.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={unavailableHalls.includes(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      {/* Food required*/}

      <FormControl>
        <InputLabel id="demo-multiple-chip-label">Food Requiremnt</InputLabel>
        <Select
          labelId="demo-paymentBy-label"
          sx={{width:"300px"}}
          id="demo-multiple-chip"
          multiple
          placeholder='Food required'
          value={EquipmentRequired}
          onChange={handleEquipmentNeededChange}
          input={<OutlinedInput id="select-multiple-chip" label="Food Requirements" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {FoodRequied.map((equip) => (
            <MenuItem
              key={equip.label}
              value={equip.value}
              style={getStyles(equip.value, EquipmentRequired, theme)}
            >
              {equip.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

       {/* Menu */}
       <TextField
        sx={{width:"300px"}}
        id="outlined-Menu-input"
        select
        label="Menu Requested*"
        placeholder='Select a Menu '
        value={requiredHall}
        onChange={handlehallChange}
      >
        {Menu.map((option) => (
          <MenuItem key={option.value} value={option.value} >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

     {/* Menu */}
     <TextField
        sx={{width:"300px"}}
        id="outlined-PaymentBy-input"
        select
        label="Payment By *"
        placeholder='Payment Done By '
        value={requiredHall}
        onChange={handlehallChange}
      >
        {Payment.map((option) => (
          <MenuItem key={option.value} value={option.value} >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* selecting user name */}

      <TextField
        id="outlined-select-name"
        sx={{width:"300px"}}
        label="Applicant Name *"
        placeholder='Enter your Name'
        value={name}
        onChange={handleNameChange}
      />

      <TextField
        id="outlined-phone_number-input"
        sx={{width:"300px"}}
        label="Contact number *"
        type="number"
        placeholder='Enter your Contact number'
        value={contactNumber}
        onChange={handleContactNumberChange}
      />

      <TextField
        id="Designation-Department-input"
        sx={{width:"300px"}}
        label="Designation & Department *"
        type="text"
        placeholder='Example:(AP/CSE)'
        value={DesignationDepartment}
        onChange={handleDesignationChange}
      />

      <TextField
        id="outlined-select-purpose"
        sx={{width:"300px"}}
        label="Purpose of visit *"
        placeholder='Enter your visit'
        value={purpose}
        onChange={handlepurposeChange}
      />

      {/* no of attendees */}

      <TextField
        id="no_of_guest-input"
        sx={{width:"300px"}}
        label="No of Guests *"
        type="number"
        value={noOfAttendees}
        onChange={handleNoOfAttendeesChange}
      />


      {/* Name of Guest */}
      <TextField
        id="outlined-GuestName-textarea"
        sx={{width:"300px"}}
        label="Name of Guest *"
        placeholder="Name of Guest"
        multiline
        value={specialRequirements}
        onChange={handleSpecialRequirementsChange}
      />
    </div>
  );
}

export default GuestHouseForm;
