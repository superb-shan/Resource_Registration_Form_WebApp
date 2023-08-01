import React from 'react'
import { Button } from '@mui/material';
import { TransportContext } from '../Context/Transport.Context';
import { useContext } from 'react';


import Transport_Inputfield from './Transport_Inputfield'

function TransportContainer() {

  const{
    userName, setUserName,
    phoneNumber, setPhoneNumber,
    purposeOfTravel, setPurposeOfTravel,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    pickupLocation, setPickupLocation,
    dropLocation, setDropLocation,
    noOfPassengers, setNoOfPassengers,
    specialRequirement, setSpecialRequirement
  } = useContext(TransportContext);

    const handleSubmit = () => {
        
        console.log('Form data submitted:');
        console.log('User Name:', userName);
        console.log('Contact Number:', phoneNumber);
        console.log('Purpose of Travel:', purposeOfTravel);
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
        console.log('Pickup Location:', pickupLocation);
        console.log('Drop Location:', dropLocation);
        console.log('No. of Passengers:', noOfPassengers);
        console.log('Special Requirement:', specialRequirement);
      };
  return (
    <div className='flex justify-center flex-col items-center bg-fixed bg-[#1976d2] pt-10'>
      <p style={{color: "#ffffff", textAlign:"center", fontSize:"2rem"}}> Transportation Registration Form </p>
      <div className='bg-white m-auto my-10 p-10 w-[500px] border rounded-2xl flex items-center flex-col shadow-2xl'>
          <Transport_Inputfield/>
          <Button variant={"contained"} sx={{width: "100px", marginTop: "2.5rem"}}  onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default TransportContainer
