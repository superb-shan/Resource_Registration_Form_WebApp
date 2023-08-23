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
    const [requestorPhoneNumber, setRequestorPhoneNumber] = useState('');
    const [organizingDepartment, setOrganizingDepartment] = useState('');
    const [purposeOfRequisition, setPurposeOfRequisition] = useState('');
    const [requisitionDateTime, setRequisitionDateTime] = useState(null);

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
        requestorPhoneNumber,
        organizingDepartment,
        purposeOfRequisition,
        requisitionDateTime
      ];

    const handleSubmit = async() => {

        const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
        if (!allFieldsNotEmpty){
            toast.warning('Fill all the Required fields');
            return;
        }
        if(requestorPhoneNumber.length!=='10'){
            toast.error("Enter 10 digit Phone Number");
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
        const res = await axios.post(`/items/create`, 
        {
            userName,
            requestorName,
            requestorPhoneNumber,
            organizingDepartment,
            purposeOfRequisition,
            requisitionDateTime: formattedDateTime
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
        <TextInput label="Requestor Phone Number *" type="number" value={requestorPhoneNumber} setValue={setRequestorPhoneNumber} />
        <TextInput label="Organizing Department *" select={true} value={organizingDepartment} setValue={setOrganizingDepartment} options={allDepartments} />
        <TextInput label="Purpose of Requisition *" select={true} value={purposeOfRequisition} setValue={setPurposeOfRequisition} options={['1', '2', '3', '4', '5', 'Others']} />
        <DateTimeInput label="Requisition Date Time *" value={requisitionDateTime} setValue={setRequisitionDateTime} />
        <Button variant="contained"  onClick={handleSubmit} color={postStatus?'success':'primary'} endIcon={postStatus?<Done />:<Send />}>{postStatus?"Submitted":"Submit"}</Button>
    </FormContainer>
  )
}

export default ItemsForm;