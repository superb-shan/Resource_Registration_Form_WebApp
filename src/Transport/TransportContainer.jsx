import React from 'react'
import { Button } from '@mui/material';
import { TransportContext } from '../Context/Transport.Context';
import { LoginContext } from '../Context/Login.Context';
import { useContext } from 'react';
import moment from "moment";


import Transport_Inputfield from './Transport_Inputfield'
import axios from 'axios';

function TransportContainer() {

  function isNotEmpty(value) {
    if (value === null || value === undefined) {
      return false;
    }
  
    if (typeof value === "string" || Array.isArray(value)) {
      return value.trim() !== "";
    }
  
    if (typeof value === "object" && value instanceof Date) {
      return !isNaN(value.getTime());
    }
  
    return true;
  }
  
  function areAllFieldsNotEmpty(fields) {
    for (const field of fields) {
      if (!isNotEmpty(field)) {
        return false;
      }
    }
    return true;
  }
  
  const {userName} = useContext(LoginContext);

  const {
    name,
    phoneNumber, 
    purposeOfTravel, 
    selectedDate, 
    selectedTime, 
    pickupLocation, 
    dropLocation, 
    noOfPassengers, 
    specialRequirement,
  } = useContext(TransportContext);

  const fieldsToCheckForValidation = [
    name,
    phoneNumber,
    purposeOfTravel,
    selectedDate,
    selectedTime,
    pickupLocation,
    dropLocation,
    noOfPassengers.toString(),
  ];

  const formattedDateTime = moment(selectedDate).format("YYYY-MM-DD") + "T" + moment(selectedTime.toString()).format("HH:mm:ss");


  const SendTransportData = async () => {

    const res = await axios.post(`http://localhost:8000/transport/create`, 
    {
      name,
      userName,
      phoneNumber, 
      purposeOfTravel, 
      formattedDateTime, 
      pickupLocation, 
      dropLocation, 
      noOfPassengers, 
      specialRequirement,
     }
    );

    const postStatus = res.data.message;
    console.log(postStatus);

  }

    const handleSubmit = () => {
        
      const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
      if (!allFieldsNotEmpty) alert("Please fill in the required details")
      else{
        // console.log(true);
        // console.log(userName, formattedDateTime);
        SendTransportData();
      }

      // console.log('Form data submitted:');
      // console.log('Name:', name);
      // console.log('Contact Number:', phoneNumber);
      // console.log('Purpose of Travel:', purposeOfTravel);
      // console.log('Selected Date:', selectedDate);
      // console.log('Selected Time:', selectedTime);
      // console.log('Pickup Location:', pickupLocation);
      // console.log('Drop Location:', dropLocation);
      // console.log('No. of Passengers:', noOfPassengers);
      // console.log('Special Requirement:', specialRequirement);
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
