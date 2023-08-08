
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
import { GuestHouseContext } from '../../Context/GuestHouse.Context';
import { Box, Button, Chip, FormControl, Grid, InputLabel, List, ListItemText, OutlinedInput, Select, Typography, useTheme, Demo, Divider } from '@mui/material';
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



function GuestHouseInputField() {

  const theme = useTheme();


  const {
    name, setName,
    contactNumber, setContactNumber,
    DesignationDepartment, setDesignation,
    requiredRoom,
    startDate,
    endDate,
    startTime,
    endTime,
    noOfAttendees,
    foodRequirements,
    noOfGuest,
    setHall,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setNoOfAttendees,
    setSpecialRequirements,
    setPurpose,
    purpose,
    isAvailabilityChecked, 
    setIsAvailabilityChecked,
    unavailableHalls, 
    isAvailabilityLoading, 
    handleCheckAvailability,
    requiredmenu,
    requiredPayment,
    eventHall,
    Food,
    TypeOfAcc,
    Menu,
    Payment,
    FoodRequired, setFoodRequired
    } 
  = useContext(GuestHouseContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };


  const handleroomChange = (event) => {
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

  const handlemenuChange=()=>{
    console.log("hai")
  }


  const handleFoodRequirementsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFoodRequired(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handlenoOfGuest = (event) => {
    setSpecialRequirements(event.target.value);
  };

  const handlepurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const handlepaymentChange=()=>{
    console.log("payment")
  }


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
              { unavailableHalls.length === eventHall.length ? <ListItemText primary={"None"} />  : eventHall.filter(hall => !unavailableHalls.includes(hall.value)).map((hall) => <ListItemText primary={hall.value} />)}
            </List>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={5}>
          <Typography variant="h6" component="div">
            Not Available
          </Typography>
          <Box>
            <List>
              {unavailableHalls.length === 0 ? <ListItemText primary={"None"} />  : unavailableHalls.map((hall) => <ListItemText primary={hall}/>)}  
            </List>
          </Box>
        </Grid>
      </Grid>
      }

      {/* Room required */}
      <TextField
        sx={{width:"300px"}}
        id="outlined-room-required-input"
        select
        label="Required Room *"
        placeholder='Select a Room from available for the selected slot'
        value={requiredRoom}
        onChange={handleroomChange}
        disabled={!isAvailabilityChecked}
        title={isAvailabilityChecked? "" : "Check Availability to Enable"}
      >
        {TypeOfAcc.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={unavailableHalls.includes(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      {/*Food  Requireds*/}

      <FormControl>
        <InputLabel id="demo-multiple-chip-label"> Food Requirements *</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          sx={{width:"300px"}}
          id="demo-multiple-chip"
          multiple
          placeholder='Select the Hall Required'
          value={FoodRequired}
          onChange={handleFoodRequirementsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Equipments Required (Optional)" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Food.map((equip) => (
            <MenuItem
              key={equip.label}
              value={equip.value}
              style={getStyles(equip.value ,FoodRequired, theme)}
            >
              {equip.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
        label="Purpose of Visit *"
        placeholder='Enter your Purpose'
        value={purpose}
        onChange={handlepurposeChange}
      />

      {/* no of attendees */}

      <TextField
        id="no_of_Guest-input"
        sx={{width:"300px"}}
        label="No of Guest *"
        type="number"
        value={noOfAttendees}
        onChange={handleNoOfAttendeesChange}
      />


      {/* Name of guest */}
      <TextField
        id="outlined-Specialrequirement-textarea"
        sx={{width:"300px"}}
        label="Name of Guest(s) *"
        placeholder="Name all the Guests"
        multiline
        value={noOfGuest}
        onChange={handlenoOfGuest}
      />

       {/* Menu */}
            <TextField
            sx={{width:"300px"}}
            id="outlined-Menu-input"
            select
            label="Menu Requested*"
            placeholder='Select a Menu '
            value={requiredmenu}
            onChange={handlemenuChange}
            >
            {Menu.map((option) => (
                <MenuItem key={option.value} value={option.value} >
                {option.lable}
                </MenuItem>
            ))}
</TextField>
{console.log(Payment)}


<TextField
        sx={{width:"300px"}}
        id="outlined-room-required-input"
        select
        label="Payment BY"
        placeholder='Select Payment Option'
        value={requiredPayment}
        onChange={handlepaymentChange}
      >
        {Payment.map((option) =>  (
          <MenuItem 
            key={option.value}
            value={option.value}
          >
            {option.lable}
          </MenuItem>
        ))}
      </TextField>

      
    </div>
  );
}

export default GuestHouseInputField;

