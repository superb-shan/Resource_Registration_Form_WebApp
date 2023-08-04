import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import SeminorHallForm from './SeminorHallForm'
import { UserContext } from '../Context/User.Context';
import { useContext } from 'react';
import { useState } from 'react';
import moment from 'momnet';
import axios from 'axios';
import { TransportContext } from '../Context/Transport.Context';
import { LoginContext } from '../Context/Login.Context';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SeminorContext } from '../Context/Seminor.Context';


function SeminorHallWrapper() {

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
            contactNumber, 
            purpose,
            // requiredhall
            designation, 
            department,  
            startDate,
            endDate,
            startTime,
            endTime,
            noOfAttendees,
            equipmentNeeded,
            specialRequirements,
  } = useContext(SeminorContext);

  const fieldsToCheckForValidation = [
            name,
           contactNumber, 
            purpose,
            designation, 
            department,  
            startDate,
            endDate,
            startTime,
            endTime,
            noOfAttendees,
  ];

  const SendSeminorData = async () => {

   // const formattedDateTime = moment(startDate).format("YYYY-MM-DD") + "T" + moment(startTime.toString()).format("HH:mm:ss");
    const res = await axios.post(`http://localhost:8000/seminar/create`, 
    {
      name,
      userName,
      contactNumber, 
      purpose,
     // designation, 
      //department,  
      startDate,
      endDate,
      startTime,
      endTime,
      noOfAttendees,
      equipmentNeeded,
      specialRequirements,
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
        await SendSeminorData();
        console.log(postStatus,"hai")
        if(postStatus=='true'){
          toast.success("Submitted");
        }else{
          console.log(postStatus)
          toast.error(postStatus)
        }
      }
    }
  


  return (
    <div className='flex justify-center flex-col items-center bg-fixed bg-[#1976d2] pt-10'>
      <p style={{color: "#ffffff", textAlign:"center", fontSize:"2rem"}}> Seminor Hall Booking Form</p>
      <div className='bg-white m-auto my-10 p-10 w-[500px] border rounded-2xl flex items-center flex-col shadow-2xl'>
      <SeminorHallForm />
      <Button 
      variant={"contained"} 
      sx={{ marginTop: "2.5rem"}}  
      onClick={handleSubmit} 
      color={postStatus?'success':'primary'} 
      endIcon={postStatus?<DoneIcon />:<SendIcon />}
      >
        {postStatus?"Submitted":"Submit"}</Button>   
           </div>
    </div>
  
  )
}
    

export default SeminorHallWrapper
