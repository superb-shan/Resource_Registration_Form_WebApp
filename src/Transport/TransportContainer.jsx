import React from 'react'
import { Button } from '@mui/material';
import { TransportContext } from '../Context/Transport.Context';
import { useContext } from 'react';


import Transport_Inputfield from './Transport_Inputfield'

function TransportContainer() {

  const{userName, setUserName,
    phoneNumber, setPhoneNumber,
    purposeOfTravel, setPurposeOfTravel,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    pickupLocation, setPickupLocation,
    dropLocation, setDropLocation,
    noOfPassengers, setNoOfPassengers,
    specialRequirement, setSpecialRequirement}=useContext(TransportContext)

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
    <div className='bg-white h-[750px] w-[500px] overflow-scroll border rounded-2xl flex justify-evenly items-center flex-col shadow-2xl'>
        <Transport_Inputfield/>
        <Button variant={"contained"} sx={{width: "100px"}} onClick={handleSubmit}>Submit</Button>

    </div>
  )
}

export default TransportContainer
