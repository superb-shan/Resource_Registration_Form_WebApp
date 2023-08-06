
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useContext } from 'react';
import { SeminorContext } from '../../Context/Seminor.Context';
import { Box, Button, Chip, FormControl, InputLabel, OutlinedInput, Select, useTheme } from '@mui/material';
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


function SeminorHallForm() {

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

  const eventEquipment = [{
    value: "Audio",
    label: "Audio"

  }, {
    value: "Video",
    label: "Video"

  },
  {
    value: "Reception items",
    label: "Reception items"
  },
  {
    value: "Power Back up",
    label: "Power Back up"
  }, {
    value: "Others",
    label: "Others"
  }
  ];


  const eventHall = [
    {
      value: 'Board Room',
      label: 'Board Room'
    },
    {
      value: 'Ignite',
      label: 'Ignite'
    },
    {
      value: 'GF-07',
      label: 'GF-07'
    },
    {
      value: 'placement Lab',
      label: 'placement Lab'
    },
    {
      value: 'IT center',
      label: 'IT center'
    }, {
      value: 'Seminor Hall 1st Floor',
      label: 'Seminor Hall 1st Floor'
    }, {
      value: 'Seminor Hall 2nd Floor',
      label: 'Seminor Hall 2nd Floor'
    },
    {
      value: 'Others',
      label: 'Others'
    }
  ];


  return (
    <div className='flex flex-col gap-10 w-[300px] '>

      {/* selecting user name */}

      <TextField
        id="outlined-select-name"
        label="Name *"
        placeholder='Enter your Name'
        value={name}
        onChange={handleNameChange}
      />

      <TextField
        id="outlined-phone_number-input"
        label="Contact number *"
        type="text"
        placeholder='Enter your Contact number'
        value={contactNumber}
        onChange={handleContactNumberChange}
      />

      <TextField
        id="Designation-Department-input"
        label="Designation & Department *"
        type="text"
        placeholder='Example:(AP/CSE)'
        value={DesignationDepartment}
        onChange={handleDesignationChange}
      />

      <TextField
        id="outlined-select-purpose"
        label="Purpose of Event *"
        placeholder='Enter your Purpose'
        value={purpose}
        onChange={handlepurposeChange}
      />

      {/* start datepicker*/}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} >
          <DatePicker
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
            sx={{ width: { xs: "300px", md: "500px" } }}
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
            sx={{ width: { xs: "300px", md: "500px" } }}
            label="End Time *"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>


      <Button variant="contained" onClick={handleCheckAvailability} color={isAvailabilityChecked? "success" : "primary"} >{isAvailabilityLoading? <ReactLoading height={"20%"} width={"10%"} /> : isAvailabilityChecked ? <Done/> : <>Check Availability</>  }</Button>
      {/* hall required */}
      <TextField
        id="outlined-hall-required-input"
        select
        label="Required Hall*"
        placeholder='Select a Hall from available for the selected slot'
        value={requiredHall}
        onChange={handlehallChange}
        disabled={!isAvailabilityChecked}
        title={isAvailabilityChecked? "" : "Check Availability to Enable"}
      >
        {eventHall.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={unavailableHalls.includes(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      

      {/* no of attendees */}

      <TextField
        id="no_of_attendees-input"
        label="No of Attendees *"
        type="number"
        value={noOfAttendees}
        onChange={handleNoOfAttendeesChange}
      />

      {/* Equipments needed */}

      <FormControl>
        <InputLabel id="demo-multiple-chip-label">Equipments Required (Optional)</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          placeholder='Select the Hall Required'
          value={EquipmentRequired}
          onChange={handleEquipmentNeededChange}
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
          {eventEquipment.map((equip) => (
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

      {/* special requirement  */}
      <TextField
        id="outlined-Specialrequirement-textarea"
        label="Special Requirements (optional)"
        placeholder="Mention all your special requirements"
        multiline
        value={specialRequirements}
        onChange={handleSpecialRequirementsChange}
      />
    </div>
  );
}

export default SeminorHallForm;
