
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useContext } from 'react';
import { SeminorContext } from '../Context/Seminor.Context';



function SeminorHallForm() {

  const{
    name, setName,
    contactNumber, setContactNumber,
    designation, setDesignation,
    department, setDepartment, hall,
    startDate,
    endDate,
    startTime,
    endTime,
    noOfAttendees,
    equipmentNeeded,
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
    purpose
  }=useContext(SeminorContext)


  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handlehallChange = (event) => {
    setHall(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleNoOfAttendeesChange = (event) => {
    setNoOfAttendees(event.target.value);
  };

  const handleEquipmentNeededChange = (event) => {
    setEquipmentNeeded(event.target.value);
  };

  const handleSpecialRequirementsChange = (event) => {
    setSpecialRequirements(event.target.value);
  };

  const handlepurposeChange=(event)=>{
    setPurpose(event.target.value);
  }

  
      const eventEquipment=[{
        value:"Audio", 
        label: "Audio"

      },{
        value:"Video",
        label: "Video"
        
      },
      {
        value:"Reception items",
        label:"Reception items"
      },
      {
        value:"Power Back up",
        label:"Power Back up"
      },{
        value:"Others",
        label :"Others"
      }
    ]
    

      const eventHall=[
        {
            value:'Board Room',
            label: 'Board Room'
        },
        {
            value:'Ignite Room',
            label: 'Ignite Room'
        },
        {
            value:'GF-07',
            label: 'GF-07'
        },
        {
            value:'placement Lab',
            label: 'placement Lab'
        },
        {
            value:'IT center',
            label: 'IT center'
        },{
          value:'Seminor Hall 1st Floor',
          label: 'Seminor Hall 1st Floor'
        },{
          value:'Seminor Hall 2nd Floor',
          label: 'Seminor Hall 2nd Floor'
        },
        {
          value:'Others',
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
        id="Designation-input"
        label="Designation *"
        type="text"
        placeholder='Enter your Designation'
        value={designation}
        onChange={handleDesignationChange}
      />

      <TextField
        id="Department-input"
        label="Department *"
        type="text"
        placeholder='Enter your Department'
        value={department}
        onChange={handleDepartmentChange}
      />

      <TextField
        id="outlined-hall-required-input"
        select
        label="Required Hall*"
        placeholder='Select the Hall Requried'
        value={hall}
        onChange={handlehallChange}
      >
          {eventHall.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
        id="outlined-select-purpose"
        label="Purpose of Event *"
        placeholder='Enter your Purpose'
        value={purpose}
        onChange={handlepurposeChange}
      />

        {/* start datepicker*/}


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
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
          <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
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
          sx={{ width: "500px" }}
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
          sx={{ width: "500px" }}
          label="End Time *"
          value={endTime}
          onChange={handleEndTimeChange}
        />
        </DemoContainer>
      </LocalizationProvider>  
      

        {/* no of attendees */}

        <TextField
        id="no_of_attendees-input"
        label="No of Attendees *"
        type="number"
        value={noOfAttendees}
        onChange={handleNoOfAttendeesChange}
      />

           {/* Equipments needed */}


    <TextField
        id="outlined-equipment-required-input"
        select
        label="Equipments needed *"
        placeholder='Equipments needed'
        value={equipmentNeeded}
        onChange={handleEquipmentNeededChange}
      >
          {eventEquipment.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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
