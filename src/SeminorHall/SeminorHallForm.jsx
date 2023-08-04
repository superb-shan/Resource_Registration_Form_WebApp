
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



function SeminorHallForm() {

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
    

      const eventPurpose=[
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
          value={name}
          onChange={handleNameChange}
          placeholder='Enter your Name'
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
        />

        {/* designation */}

        <TextField
          id="Designation-input"
          label="Designation *"
          type="text"
          value={pickupLocation}
          onChange={handlePickupLocationChange}
          placeholder='Enter your Designation'
        />  

{/* deparment */}

        <TextField
          id="Department-input"
          label="Department *"
          type="text"
          value={dropLocation}
          onChange={handleDropLocationChange}
          placeholder='Enter your Department'
        />  


 {/* selecting purpose */}

        <TextField
          id="outlined-purpose_of_travel-input"
          select
          label="Purpose of Event *"
          value={purposeOfTravel}
          onChange={handlePurposeOfTravelChange}
          placeholder='Select the Purpose'
        >
          {eventPurpose.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* start datepicker*/}


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
            <DatePicker
            label='Start Date *'
            views={['year', 'month', 'day']}
            disablePast
            value={selectedDate}
            onChange={handleDateChange}
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
            value={selectedDate}
            onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider> 

     {/* time picker start*/}

      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker 
            sx={{width: "500px"}}
            label="Start Time *" 
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>    

       {/* time picker end*/}

      
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker 
            sx={{width: "500px"}}
            label="End Time *" 
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </DemoContainer>
      </LocalizationProvider>  
      

        {/* no of attendees */}

    <TextField
          id="no_of_attendees-input"
          label="No of Attendees *"
          type="number" 
          value={noOfPassengers}
          onChange={handleNoOfPassengersChange}
        /> 

           {/* Equipments needed */}


    <TextField
          id="outlined-purpose_of_travel-input"
          select
          label="Equipments needed *"
          value={purposeOfTravel}
          onChange={handlePurposeOfTravelChange}
          placeholder='Equipments needed'
        >
          {eventEquipment.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* special requirement  */}
        <TextField
          id="outlined-textarea"
          label="Special Requirements (optional)"
          placeholder="Mention all your special requirements"
          multiline
          onChange={handleSpecialRequirementChange}
          value={specialRequirement}
        />
        </div>
  );
}

export default SeminorHallForm;
