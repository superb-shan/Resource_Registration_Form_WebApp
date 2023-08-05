import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import { TransportContext } from '../../Context/Transport.Context';
import { LoginContext } from '../../Context/Login.Context';
import { useContext } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import moment from "moment";
import TransportInputField from './TransportInputField';
import axios from 'axios';
import { useState } from 'react';
import { UserContext } from '../../Context/User.Context';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function TransportContainer() {

  const [postStatus, setPostStatus] = useState('');
  const {setSelectedView} = useContext(UserContext)

  useEffect(()=> {console.log(postStatus, "useEffect")}, [postStatus, setPostStatus])

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

  const SendTransportData = async () => {

    const formattedDateTime = moment(selectedDate).format("YYYY-MM-DD") + "T" + moment(selectedTime.toString()).format("HH:mm:ss");
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
    console.log("Response:", res);
    setPostStatus(res);
    setSelectedView('My Bookings')
  }

    const handleSubmit = async() => {
        

      const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
      if (!allFieldsNotEmpty) toast.warning('Fill all the Required fields')
      else{
        await SendTransportData();
        console.log(postStatus,"hai")
        if(postStatus=='true'){
          toast.success("Submitted");
        }else{
          console.log(postStatus)
          toast.error(postStatus)
        }
        
      }
      };

  return (
    <div className='flex justify-center flex-col items-center bg-fixed bg-[#1976d2] pt-10'>
      <p style={{color: "#ffffff", textAlign:"center", fontSize:"2rem"}}> Transportation Registration Form </p>
      <div className='bg-white m-auto my-10 p-10 w-[500px] border rounded-2xl flex items-center flex-col shadow-2xl'>
          <TransportInputField />
          <Button variant={"contained"} sx={{ marginTop: "2.5rem"}}  onClick={handleSubmit} color={postStatus?'success':'primary'} endIcon={postStatus?<DoneIcon />:<SendIcon />}>{postStatus?"Submitted":"Submit"}</Button>
      </div>
    </div>
  )
}

export default TransportContainer;
