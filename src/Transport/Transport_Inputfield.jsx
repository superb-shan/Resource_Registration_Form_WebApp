
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TransportContext } from '../Context/Transport.Context';
import { useContext } from 'react';





function Transport_Inputfield() {


  const{userName, setUserName,
    phoneNumber, setPhoneNumber,
    purposeOfTravel, setPurposeOfTravel,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    pickupLocation, setPickupLocation,
    dropLocation, setDropLocation,
    noOfPassengers, setNoOfPassengers,
    specialRequirement, setSpecialRequirement}=useContext(TransportContext)


    // Event handler for UserName TextField
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
      };
    
      // Event handler for PhoneNumber TextField
      const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
      };
    
      // Event handler for PurposeOfTravel TextField
      const handlePurposeOfTravelChange = (event) => {
        setPurposeOfTravel(event.target.value);
      };

       // Event handler for Date Picker
      const handleDateChange = (date) => {
     setSelectedDate(date);
     };

     // Event handler for Time Picker
     const handleTimeChange = (time) => {
    setSelectedTime(time);
     };

       // Event handler for Pick up location TextField
  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  // Event handler for Drop location TextField
  const handleDropLocationChange = (event) => {
    setDropLocation(event.target.value);
  };

  // Event handler for No. of Passengers TextField
  const handleNoOfPassengersChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setNoOfPassengers(isNaN(newValue) ? 1 : newValue);
  };

  // Event handler for Special Requirement TextField
  const handleSpecialRequirementChange = (event) => {
    setSpecialRequirement(event.target.value);
  };

    

      const travel_purpose=[
        {
            value:'Events',
            label: 'Events'
        },
        {
            value:'Seminor',
            label: 'Seminor'
        },
        {
            value:'Chief Guest',
            label: 'Chief Guest'
        },
        {
            value:'placement',
            label: 'placement'
        },
        {
            value:'Session/Lectures',
            label: 'Session/Lectures'
        },{
          value:'Others',
            label: 'Others'
        }
    ];

    const No_of_pass =[
      {
      value:1,
      label :1
    },
    {
      value:2,
      label :2
    },
    {
      value:3,
      label :3
    },
    {
      value:4,
      label :4
    },
    {
      value:5,
      label :5
    },
    {
      value:6,
      label :6
    },
  ]


  return (
    <div>
         <div className='flex flex-col gap-10 w-[300px] pt-60 pb-10 '>
        
 {/* selecting user name */}

         <TextField
          id="outlined-select-username"
          select
          label="User Name"
          value={userName}
          onChange={handleUserNameChange}
          placeholder='Select your Name'
          helperText=""
        >
          {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
        </TextField>

  {/* entering phone number */}

        <TextField
          id="outlined-phone_number-input"
          label="Contact number"
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          helperText=""
        />

 {/* selecting purpose */}

        <TextField
          id="outlined-purpose_of_travel-input"
          select
          label="Purpose of travel"
          value={purposeOfTravel}
          onChange={handlePurposeOfTravelChange}
          defaultValue="default"
          helperText=""
        >
          {travel_purpose.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* datepicker */}

    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker
        label={'pick up Date'}
        views={['year', 'month', 'day']}
        value={selectedDate}
        onChange={handleDateChange}
        />
        </DemoContainer>
        </LocalizationProvider> 
 </div>


     {/* time picker */}

        <div>   
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
       <TimePicker 
       label="Pick up time" 
       value={selectedTime}
        onChange={handleTimeChange}
       />
        </DemoContainer>
       </LocalizationProvider>    

        </div>


{/* pickup location */}

        <TextField
          id="pickup-input"
          label="pick up location"
          type="text"
          value={pickupLocation}
          onChange={handlePickupLocationChange}
          helperText=""
        />  

{/* drop location */}

        <TextField
          id="drop-input"
          label="drop location"
          type="text"
          value={dropLocation}
          onChange={handleDropLocationChange}
          helperText=""
        />  

        {/* no of passenger */}

    <TextField
          id="no_of_pasanger-input"
          label="No of Passenger"
          type="number" 
          value={noOfPassengers}
          onChange={handleNoOfPassengersChange}
          InputProps={{ inputProps: { min: 1, max: 6 } }}
          helperText=""
        /> 

        {/* special requirement  */}

        <textarea className='border-2 text-sm'

          id="outlined-purpose_of_travel-input"
          label="Special Requirement "
          value={specialRequirement}
          onChange={handleSpecialRequirementChange}
          placeholder='Describe the Special Requirement(if any)'
        /> 
        
        
        </div>
       
      
    </div>
  )
}

export default Transport_Inputfield
