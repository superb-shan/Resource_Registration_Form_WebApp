import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import { ItemsContext } from '../../Context/Items.Context';
import { LoginContext } from '../../Context/Login.Context';
import { useContext } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import moment from "moment";
import ItemsForm from './ItemsForm';
import axios from 'axios';
import { useState } from 'react';
import { UserContext } from '../../Context/User.Context';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import sriEshwarCollegeImage from '../../Images/sriEshwarCollegeImage.png'

function ItemsContainer() {

  const [postStatus, setPostStatus] = useState('');
  const { setSelectedView } = useContext(UserContext)

  useEffect(() => { console.log(postStatus, "useEffect") }, [postStatus, setPostStatus])

  function isNotEmpty(value) {
    if (value === null || value === undefined) {
      return false;
    }

    // if (typeof value === "string" || Array.isArray(value)) {
    //   return value.trim() !== "";
    // }

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
    EmpID,
    selectedDate,
    Designation,
    Department,
    printing,
    guestMomento,
    studentMomento,
    printedEnvelop,
    answerBooklet,
    studentNotebook,
    studentNotebookWithGraph,
    studentNotebookWithoutGraph,
    observation,
    purpose,
    withindays,
    Ondate

  } = useContext(ItemsContext);

  const fieldsToCheckForValidation = [
    name,
    EmpID,
    selectedDate,
    Designation,
    Department,
    purpose,
    withindays,
    Ondate
  ];

  //not changed

  const handleSubmit = async () => {

    console.log(name, "name")

    const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
    if (!allFieldsNotEmpty) {
      toast.warning('Fill all the Required fields');
      return;
    }

    const formettedDate = moment(selectedDate.toString()).format("YYYY-MM-DD");
    const formattedOnDate = moment(Ondate.toString()).format("YYYY-MM-DD");
    console.log(selectedDate, formettedDate)
    const res = await axios.post(`/items/create`,
      {
        name,
        EmpID,
        selectedDate: formettedDate,
        Designation,
        Department,
        printing,
        guestMomento,
        studentMomento,
        printedEnvelop,
        answerBooklet,
        studentNotebook,
        studentNotebookWithGraph,
        studentNotebookWithoutGraph,
        observation,
        purpose,
        withindays,
        Ondate:formattedOnDate,
        userName
      }
    );
    console.log("Response:", res);
    setPostStatus(res.data.message);
    setSelectedView('My Bookings');
    if (res.data.message === true) {
      toast.success("Submitted");
      console.log("date", selectedDate, formettedDate);
    } else {
      toast.error("plz fill the form correctly")
    }
  };

  return (
    <div className="background-image bg-cover bg-center w-full h-full" style={{ backgroundImage: `url(${sriEshwarCollegeImage})` }}>
      <div className='flex justify-center flex-col items-center bg-fixed pt-10' style={{ backgroundColor: 'rgba(25, 118, 210, 0.9)' }}>
        <p style={{ color: "#ffffff", textAlign: "center", fontSize: "2rem" }}> Item Request Form </p>
        <div className='bg-white my-10 p-10 w-[1000px] [@media(max-width:640px)]:w-[500px] border rounded-2xl flex items-center flex-col shadow-md shadow-inner-md'>
          <ItemsForm />
          <Button variant={"contained"} sx={{ marginTop: "2.5rem" }} onClick={handleSubmit} color={postStatus ? 'success' : 'primary'} endIcon={postStatus ? <DoneIcon /> : <SendIcon />}>{postStatus ? "Submitted" : "Submit"}</Button>
        </div>
      </div>
    </div>
  )
}

export default ItemsContainer;
