import React, { useState, useContext } from 'react'
import FormContainer from '../Containers/FormContainer'
import { DateTimeInput, TextInput } from '../Fields/InteractionFields';
import { LoginContext } from '../../Context/Login.Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { UserContext } from '../../Context/User.Context';
import { Button, Typography } from '@mui/material';
import { Done, Send } from '@mui/icons-material';

const allDepartments = ['CSE', 'ECE', 'EEE', 'AI&DS/ML', 'IT', 'MECH', 'CCE', 'CSBS', 'PLAC', 'SH', 'SLC'];

const ItemsForm = () => {

    const [requestorName, setRequestorName] = useState('');
    const [requestorEmpId, setRequestorEmpID] = useState('');
    const [department, setDepartment] = useState('');
    const [purposeOfRequisition, setPurposeOfRequisition] = useState('');
    const [requisitionDateTime, setRequisitionDateTime] = useState(null);
    const [printing,setPrinting]=useState('');
    const [guestMomento,setGuestMomento]=useState('');
    const [studentMomento,setStudentMomento]=useState('');
    const [printedEnvelopes,setPrintedEnvelopes]=useState('');
    const [answerBooklets,setAnswerBooklets]=useState('');
    const [studentNotebooks,setStudentNotebooks]=useState('');
    const [recordNoteWithGraph,setRecordNoteWithGraph]=useState('');
    const [recordNoteWithoutGraph,setRecordNoteWithoutGraph]=useState('');
    const [observationBook,setObservationBook]=useState('');
    const [clearanceOfBill, setClearanceOfBill] = useState(null);


    const [postStatus, setPostStatus] = useState('');
    const {userName} = useContext(LoginContext);
    const {setSelectedView} = useContext(UserContext);

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

    const fieldsToCheckForValidation = [
        requestorName,
        requestorEmpId,
        department,
        purposeOfRequisition,
        requisitionDateTime,
        clearanceOfBill
      ];

    const handleSubmit = async() => {

        const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
        if (!allFieldsNotEmpty){
            toast.warning('Fill all the Required fields');
            return;
        }
        if(requestorName.length <3 || requestorName.length>=50 ){
            toast.error("Name should be greater than three characters")
            return;
        }
        if(requisitionDateTime.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")){
            toast.error("cannot book transport for today");
            return;
        }

        const formattedDateTime = requisitionDateTime.toString();
        const formatted1DateTime = clearanceOfBill.toString();
        const res = await axios.post(`/items/create`, 
        {
            userName,
            requestorName,
            requestorEmpId,
            department,
            purposeOfRequisition,
            requisitionDateTime: formattedDateTime,
            printing,
            guestMomento,
            studentMomento,
            printedEnvelopes,
            answerBooklets,
            studentNotebooks,
            recordNoteWithGraph,
            observationBook,
            recordNoteWithoutGraph,
            clearanceOfBill: formatted1DateTime
        }
        );
        setPostStatus(res.data.message);
        console.log(res);
        if(res.data.message===true){
            toast.success("Submitted");
        }else{
            toast.error("Please fill the form correctly");
            return;
        }
        setSelectedView('My Bookings');
    };

    

  return (
    <FormContainer title="Items Form">
        <TextInput label="Requestor Name *" value={requestorName} setValue={setRequestorName} />
        <TextInput label="Requestor EMP ID *" type="number" value={requestorEmpId} setValue={setRequestorEmpID} />
        <TextInput label="Department *" select={true} value={department} setValue={setDepartment} options={allDepartments} />
        <TextInput label="Purpose of Requisition *"  value={purposeOfRequisition} setValue={setPurposeOfRequisition}  />
        <DateTimeInput label="Requisition Date Time *" value={requisitionDateTime} setValue={setRequisitionDateTime} />
        <Typography>Enter the Required Quantity for the required field alone in below </Typography>
        <TextInput label="Printing of books/Ledgers/Manual/Certificates " value={printing} setValue={setPrinting} />
        <TextInput label="Guest Momento " value={guestMomento} setValue={setGuestMomento} />
        <TextInput label="Student Momento " value={studentMomento} setValue={setStudentMomento} />
        <TextInput label="Printed Envelopes " value={printedEnvelopes} setValue={setPrintedEnvelopes} />
        <TextInput label="Answer Booklets " value={answerBooklets} setValue={setAnswerBooklets} />
        <TextInput label="Student Notebooks " value={studentNotebooks} setValue={setStudentNotebooks} />
        <TextInput label="Student Record Notebook with graph " value={recordNoteWithGraph} setValue={setRecordNoteWithGraph} />
        <TextInput label="Student Record Notebook without graph " value={recordNoteWithoutGraph} setValue={setRecordNoteWithoutGraph} />
        <TextInput label="Student Observation Book" value={observationBook} setValue={setObservationBook} />
        <DateTimeInput label="Clearance of Bill On or Before *" value={clearanceOfBill} setValue={setClearanceOfBill} />

        <Button variant="contained"  onClick={handleSubmit} color={postStatus?'success':'primary'} endIcon={postStatus?<Done />:<Send />}>{postStatus?"Submitted":"Submit"}</Button>
    </FormContainer>
  )
}

export default ItemsForm;