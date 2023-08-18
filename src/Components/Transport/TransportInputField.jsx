
import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TransportContext } from '../../Context/Transport.Context';
import { useContext } from 'react';


function TransportInputField() {

  const{
    name, setName,
    phoneNumber, setPhoneNumber,
    purposeOfTravel, setPurposeOfTravel,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    pickupLocation, setPickupLocation,
    dropLocation, setDropLocation,
    noOfPassengers, setNoOfPassengers,
    specialRequirement, setSpecialRequirement
  }
  = useContext(TransportContext)


    // Event handler for UserName TextField
    const handleNameChange = (event) => {
        setName(event.target.value);
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
            value:'Seminar',
            label: 'Seminar'
        },
        {
            value:'Chief Guest',
            label: 'Chief Guest'
        },
        {
            value:'Placement',
            label: 'Placement'
        },
        {
            value:'Session/Lectures',
            label: 'Session/Lectures'
        },{
          value:'Others',
            label: 'Others'
        }
    ];

  //   const No_of_pass =[
  //     {
  //     value:1,
  //     label :1
  //   },
  //   {
  //     value:2,
  //     label :2
  //   },
  //   {
  //     value:3,
  //     label :3
  //   },
  //   {
  //     value:4,
  //     label :4
  //   },
  //   {
  //     value:5,
  //     label :5
  //   },
  //   {
  //     value:6,
  //     label :6
  //   },
  // ]


  return (
    <div className='flex flex-wrap gap-8 justify-evenly items-center w-[800px] [@media(max-width:640px)]:w-[500px]'>
        
 {/* selecting user name */}

         <TextField
          id="outlined-select-username"
          label="Name *"
          value={name}
          onChange={handleNameChange}
          placeholder='Enter your Name'
          sx={{width: "300px"}}
        >
         
        </TextField>

  {/* entering phone number */}

        <TextField
          id="outlined-phone_number-input"
          label="Contact number *"
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder='Enter your Contact number'
          sx={{width: "300px"}}
        />

 {/* selecting purpose */}

        <TextField
          id="outlined-purpose_of_travel-input"
          select
          label="Purpose of travel *"
          value={purposeOfTravel}
          onChange={handlePurposeOfTravelChange}
          placeholder='Select the Purpose'
          sx={{width: "300px"}}
        >
          {travel_purpose.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* no of passenger */}

    <TextField
          id="no_of_pasanger-input"
          label="No of Passengers *"
          type="number" 
          value={noOfPassengers}
          onChange={handleNoOfPassengersChange}
          InputProps={{ inputProps: { min: 1, max: 6 } }}
          placeholder='Enter the no of Passengers'
          sx={{width: "300px"}}
        /> 

        {/* datepicker */}


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
            label='Pick up Date *'
            sx={{width: "300px"}}
            views={['year', 'month', 'day']}
            disablePast
            value={selectedDate}
            onChange={handleDateChange}
            format='DD-MM-YYYY'
            />
          </DemoContainer>
        </LocalizationProvider> 


     {/* time picker */}

      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']} >
          <TimePicker 
            sx={{width: "300px"}}
            label="Pick up Time *" 
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>    
      
{/* pickup location */}

        <TextField
          id="pickup-input"
          label="Pick up Location *"
          type="text"
          value={pickupLocation}
          onChange={handlePickupLocationChange}
          placeholder='Enter  Pickup location'
          sx={{width: "300px"}}
        />  

{/* drop location */}

        <TextField
          id="drop-input"
          label="Drop Location *"
          type="text"
          value={dropLocation}
          onChange={handleDropLocationChange}
          placeholder='Enter Drop location'
          sx={{width: "300px"}}
        />  


        {/* special requirement  */}
        <TextField
          id="outlined-textarea"
          label="Special Requirements (optional)"
          placeholder="Mention all your special requirements"
          multiline
          onChange={handleSpecialRequirementChange}
          value={specialRequirement}
          sx={{width: "300px"}}
        />
        </div>
  );
}

export default TransportInputField;
