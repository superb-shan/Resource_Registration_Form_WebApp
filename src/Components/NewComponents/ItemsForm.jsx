import React, { useState, useContext } from 'react'
import FormContainer from './FormContainer'
import { DateTimeInput, TextInput } from './InteractionFields';
import { LoginContext } from '../../Context/Login.Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { UserContext } from '../../Context/User.Context';
import { Button } from '@mui/material';
import { Done, Send } from '@mui/icons-material';

const allDepartments = ['CSE', 'ECE', 'EEE', 'AI&DS/ML', 'IT', 'MECH', 'CCE', 'CSBS', 'PLAC', 'SH', 'SLC'];

const ItemsForm = () => {

    const [requestorName, setRequestorName] = useState('');
    const [requestorEmpId, setRequestorEmpID] = useState('');
    const [Department, setDepartment] = useState('');
    const [purposeOfRequisition, setPurposeOfRequisition] = useState('');
    const [requisitionDateTime, setRequisitionDateTime] = useState(null);
    const[Designation,setDesignation]=useState('');
    const[Printing,setPrinting]=useState('');
    const[GuestMomento,setGuestMomento]=useState('');
    const[StudentMomento,setStudentMomento]=useState('');
    const[PrintedEnvelopes,setPrintedEnvelopes]=useState('');
    const[AnswerBooklets,setAnswerBooklets]=useState('');
    const[StudentNotebooks,setStudentNotebooks]=useState('');
    const[RecordNoteWithGraph,setRecordNoteWithGraph]=useState('');
    const[RecordNoteWithoutGraph,setRecordNoteWithoutGraph]=useState('');
    const[ObservationBook,setObservationBook]=useState('');
    const [ClearanceOfBill, setClearanceOfBill] = useState(null);


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
        Department,
        purposeOfRequisition,
        requisitionDateTime,
        Designation,
        ClearanceOfBill
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
        const formatted1DateTime = requisitionDateTime.toString();
        const res = await axios.post(`/items/create`, 
        {
            userName,
            requestorEmpId,
            requestorName,
            Department,
            purposeOfRequisition,
            requisitionDateTime: formattedDateTime,
            Designation,
            Printing,
            GuestMomento,
            StudentMomento,
            PrintedEnvelopes,
            AnswerBooklets,
            StudentNotebooks,
            RecordNoteWithGraph,
            ObservationBook,
            RecordNoteWithoutGraph,
            ClearanceOfBill: formatted1DateTime


        }
        );
        setPostStatus(res.data.message);
        setSelectedView('My Bookings');
        if(res.data.message===true){
            toast.success("Submitted");
        }else{
            toast.error("Please fill the form correctly")
        }
    };

    

  return (
    <FormContainer title="Items Form">
        <TextInput label="Requestor Name *" value={requestorName} setValue={setRequestorName} />
        <TextInput label="Requestor EMP ID *" type="number" value={requestorEmpId} setValue={setRequestorEmpID} />
        <TextInput label="Department *" select={true} value={Department} setValue={setDepartment} options={allDepartments} />
        <TextInput label="Purpose of Requisition *"  value={purposeOfRequisition} setValue={setPurposeOfRequisition}  />
        <DateTimeInput label="Requisition Date Time *" value={requisitionDateTime} setValue={setRequisitionDateTime} />
        <TextInput label="Designation *" value={Designation} setValue={setDesignation} />
        <p>Enter the Required Quantity for the required field alone in below </p>
        <TextInput label="Printing of books/Ledgers/Manual/Certificates " value={Printing} setValue={setPrinting} />
        <TextInput label="Guest Momento " value={GuestMomento} setValue={setGuestMomento} />
        <TextInput label="Student Momento " value={StudentMomento} setValue={setStudentMomento} />
        <TextInput label="Printed Envelopes " value={PrintedEnvelopes} setValue={setPrintedEnvelopes} />
        <TextInput label="Answer Booklets " value={AnswerBooklets} setValue={setAnswerBooklets} />
        <TextInput label="Student Notebooks " value={StudentNotebooks} setValue={setStudentNotebooks} />
        <TextInput label="Student Record Notebook with graph " value={RecordNoteWithGraph} setValue={setRecordNoteWithGraph} />
        <TextInput label="Student Record Notebook without graph " value={RecordNoteWithoutGraph} setValue={setRecordNoteWithoutGraph} />
        <TextInput label="Student Observation Book*" value={ObservationBook} setValue={setObservationBook} />
        <DateTimeInput label="Clearance of Bill On or Before *" value={ClearanceOfBill} setValue={setClearanceOfBill} />

        <Button variant="contained"  onClick={handleSubmit} color={postStatus?'success':'primary'} endIcon={postStatus?<Done />:<Send />}>{postStatus?"Submitted":"Submit"}</Button>
    </FormContainer>
  )
}

export default ItemsForm;