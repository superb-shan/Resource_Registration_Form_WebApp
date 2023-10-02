import React, { useState, useContext } from 'react'
import FormContainer from '../Containers/FormContainer'
import { DateTimeInput, TextInput } from '../Fields/InteractionFields';
import { LoginContext } from '../../Context/Login.Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { UserContext } from '../../Context/User.Context';
import { Button } from '@mui/material';
import { Done, Send } from '@mui/icons-material';
import { DataContext } from '../../Context/Data.Context';


const TransportForm = () => {

    const [coordinatorName, setCoordinatorName] = useState('');
    const [coordinatorPhoneNumber, setCoordinatorPhoneNumber] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestPhoneNumber, setGuestPhoneNumber] = useState('');
    const [organizingDepartment, setOrganizingDepartment] = useState('');
    const [purposeOfTravel, setPurposeOfTravel] = useState('');
    const [travelDateTime, setTravelDateTime] = useState(null);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [noOfPassengers, setNoOfPassengers] = useState(1);
    const [specialRequirements, setSpecialRequirements] = useState('');

    const [postStatus, setPostStatus] = useState('');
    const {userName} = useContext(LoginContext);
    const {setSelectedView} = useContext(UserContext);
    const { allDepartments } = useContext(DataContext);


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
        coordinatorName,
        coordinatorPhoneNumber,
        guestName,
        guestPhoneNumber,
        organizingDepartment,
        purposeOfTravel,
        travelDateTime,
        pickupLocation,
        dropLocation,
        noOfPassengers.toString(),
      ];

    const handleSubmit = async() => {

        const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
        if (!allFieldsNotEmpty){
            toast.warning('Fill all the Required fields');
            return;
        }
        if(coordinatorPhoneNumber.length!==10 || guestPhoneNumber.length!==10){
            toast.error("Enter 10 digit Phone Number");
            return;
        }
        if(coordinatorName.length <3 || coordinatorName.length>=50 || guestName.length <3 || guestName.length>=50){
            toast.error("Name should be greater than three characters")
            return;
        }
        if(noOfPassengers<1 || noOfPassengers>6){
            toast.error("Passenger count must between 1 to 6")
            return;
        }
        if(travelDateTime.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")){
            toast.error("cannot book transport for today");
            return;
        }

        const formattedDateTime = travelDateTime.toString();
        // console.log({
        //     userName,
        //     coordinatorName,
        //     coordinatorPhoneNumber,
        //     guestName,
        //     guestPhoneNumber,
        //     purposeOfTravel,
        //     pickupLocation,
        //     dropLocation,
        //     travelDateTime: formattedDateTime,
        //     noOfPassengers: noOfPassengers.toString(),
        //     specialRequirements,
        // })
        const res = await axios.post(`/transport/create`, 
        {
            userName,
            coordinatorName,
            coordinatorPhoneNumber,
            guestName,
            guestPhoneNumber,
            purposeOfTravel,
            organizingDepartment,
            pickupLocation,
            dropLocation,
            travelDateTime: formattedDateTime,
            noOfPassengers: noOfPassengers.toString(),
            specialRequirements,
        }
        );
        setPostStatus(res.data.message);
        console.log(res.data);
        if(res.data.message==="Transport created successfully"){
            toast.success("Submitted");
        }else{
            toast.error("Please fill the form correctly");
            return;
        }
        setSelectedView('My Bookings');
    };

    

  return (
    <FormContainer title="Transportation Form">
        <TextInput label="Coordinator Name *"  value={coordinatorName} setValue={setCoordinatorName} />
        <TextInput label="Coordinator Phone Number *" type="number" value={coordinatorPhoneNumber} setValue={setCoordinatorPhoneNumber} />
        <TextInput label="Guest Name(s) *" placeholder="Enter all the guests names" value={guestName} setValue={setGuestName} />
        <TextInput label="Guest Phone Number(s) *" placeholder="Enter all the guests contact numbers" type="number" value={guestPhoneNumber} setValue={setGuestPhoneNumber}/>
        <TextInput label="Organizing Department *" select={true} value={organizingDepartment} setValue={setOrganizingDepartment} options={allDepartments} />
        <TextInput label="Purpose of Travel *" select={true} value={purposeOfTravel} setValue={setPurposeOfTravel} options={['Events', 'Seminar', 'Chief Guest', 'Placement', 'Session/Lectures', 'Others']} />
        <DateTimeInput label="Travel Date Time *" value={travelDateTime} setValue={setTravelDateTime} />
        <TextInput label="No. of Passengers *" placeholder="Max passenger count is 6" type="number" value={noOfPassengers} setValue={setNoOfPassengers}/>
        <TextInput label="Pick-up Location *" placeholder="Pick-up Location" value={pickupLocation} setValue={setPickupLocation} />
        <TextInput label="Drop Location *" placeholder="Drop Location" value={dropLocation} setValue={setDropLocation} />
        <TextInput label="Special Requirements" placeholder="Special requirements if any" multiline={true} value={specialRequirements} setValue={setSpecialRequirements}/>    
        <Button variant="contained" onClick={handleSubmit} color={postStatus?'success':'primary'} endIcon={postStatus?<Done />:<Send />}>{postStatus?"Submitted":"Submit"}</Button>
    </FormContainer>
  )
}

export default TransportForm