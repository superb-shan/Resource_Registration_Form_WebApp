import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import SeminorHallForm from './SeminorHallForm'
import { UserContext } from '../../Context/User.Context';
import { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { LoginContext } from '../../Context/Login.Context';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SeminorContext } from '../../Context/Seminor.Context';
import moment from 'moment';
import ReactLoading from 'react-loading';


function SeminorHallWrapper() {

  const [postStatus, setPostStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedView } = useContext(UserContext)

  useEffect(() => { console.log(postStatus, "useEffect") }, [postStatus, setPostStatus])

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

  const { userName } = useContext(LoginContext);

  const {
    name,
    contactNumber,
    purpose,
    requiredHall,
    DesignationDepartment,
    startDate,
    endDate,
    startTime,
    endTime,
    noOfAttendees,
    EquipmentRequired,
    specialRequirements,
    isAvailabilityChecked,
    unavailableHalls, 
    setUnavailableHalls
  } = useContext(SeminorContext);

  const fieldsToCheckForValidation = [
    name,
    contactNumber,
    requiredHall,
    purpose,
    DesignationDepartment,
    startDate,
    endDate,
    startTime,
    endTime,
    noOfAttendees,
  ];


  const handleSubmit = async () => {

    setIsLoading(true);
    const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
    if (!allFieldsNotEmpty){ 
      toast.warning('Fill all the Required fields');
      setIsLoading(false);
      return;
    }
    if (!isAvailabilityChecked){
      toast.error(`Please check Availability`);
      setIsLoading(false);
      return;
    }

    //Check for unavailability of hall before sending request
    const response = await axios.get("/seminar/checkAvailability", {params: {startDate: moment(startDate.toString()).format("YYYY-MM-DD"), endDate: moment(endDate.toString()).format("YYYY-MM-DD"), startTime: moment(startTime.toString()).format("HH:mm:ss"), endTime: moment(endTime.toString()).format("HH:mm:ss")}});
    const recentUnavailableHalls = response.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || [];

    if (recentUnavailableHalls.includes(requiredHall)){
      toast.info(`${requiredHall} is not available for this date and time.`);
      setIsLoading(false);
      return;
    }
    console.log("equip", EquipmentRequired.join(", "));

    //Create booking

    // const formattedDateTime = moment(startDate).format("YYYY-MM-DD") + "T" + moment(startTime.toString()).format("HH:mm:ss");
    const res = await axios.post(`/seminar/create`,
    {
      userName: userName,
      name: name,
      contactNumber: contactNumber,
      startDate: moment(startDate.toString()).format("YYYY-MM-DD"),
      endDate: moment(endDate.toString()).format("YYYY-MM-DD"),
      startTime: moment(startTime.toString()).format("HH:mm:ss"),
      endTime: moment(endTime.toString()).format("HH:mm:ss"),
      purpose: purpose,
      noOfAttendees: noOfAttendees,
      seating_capacity:20,
      equipmentNeeded: EquipmentRequired.join(", "),
      specialRequirements,
      designation: DesignationDepartment,
      requiredhall: requiredHall,
    }
  );
    // console.log("Response:", res);
    setPostStatus(res.data.message);
    setSelectedView('My Bookings');
    setIsLoading(false);
    if (res.data.message === "true") {
      toast.success("Submitted");
    } else {
      console.log("not created seminar", postStatus)
      toast.error(postStatus)
    }
  }



  return (
    <div className='flex justify-center flex-col items-center bg-fixed bg-[#1976d2] pt-10'>
      <p style={{ color: "#ffffff", textAlign: "center", fontSize: "2rem" }}> Seminor Hall Booking Form</p>
      <div className='bg-white m-auto my-10 p-10 w-[500px] border rounded-2xl flex items-center flex-col shadow-2xl'>
        <SeminorHallForm />
        <Button
          variant={"contained"}
          sx={{ marginTop: "2.5rem" }}
          onClick={handleSubmit}
          color={postStatus ? 'success' : 'primary'}
          endIcon={postStatus ? <DoneIcon /> : <SendIcon />}
        >
          {isLoading? <ReactLoading height={"20%"} width={"10%"} /> : postStatus ? "Submitted" : "Submit"  }
          </Button>
      </div>
    </div>

  )
}


export default SeminorHallWrapper
