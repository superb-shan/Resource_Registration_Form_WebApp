import React from 'react'
import { useState } from 'react';
import FormContainer from '../Containers/FormContainer';
import { ChipsInput, TextInput } from '../Fields/InteractionFields';
import { useContext } from 'react';
import { UserContext } from '../../Context/User.Context';
import { LoginContext } from '../../Context/Login.Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { Done, Send } from '@mui/icons-material';
import ReactLoading from 'react-loading';
import { Button } from '@mui/material';
import CheckAvailability from '../CheckAvailability/CheckAvailability';
import { GuestHouseContext } from '../../Context/GuestHouse.Context';

const allDepartments = ['CSE', 'ECE', 'EEE', 'AI&DS/ML', 'IT', 'MECH', 'CCE', 'CSBS', 'PLAC', 'SH', 'SLC'];
const allFoods = ['Breakfast', 'Lunch', 'Dinner', 'Tea & Snacks'];
const allPaymentOptions = ["Paid by institution", "Department", "Guest"];
const allMenu = ["Elite", "Special", "Normal"];

const GuestHouseForm = () => {

  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorPhoneNumber, setCoordinatorPhoneNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhoneNumber, setGuestPhoneNumber] = useState('');
  const [organizingDepartment, setOrganizingDepartment] = useState('');
  const [purposeOfStay, setPurposeOfStay] = useState('');
  const [foodRequired, setFoodRequired] = useState([]);
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [menuRequired, setMenuRequired] = useState('');
  const [paymentDoneBy, setPaymentDoneBy] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [roomRequired, setRoomRequired] = useState('');


  const [postStatus, setPostStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedView } = useContext(UserContext);
  const { userName } = useContext(LoginContext);
  const { allRooms, startDateTime,  endDateTime,  isGuestHouseAvailabilityChecked: isAvailabilityChecked, unavailableGuestHouses } = useContext(GuestHouseContext);

  

  function isNotEmpty(value) {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === "string" || Array.isArray(value)) {
      return value !== "";
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
    purposeOfStay,
    foodRequired,
    menuRequired,
    paymentDoneBy,
    startDateTime,
    endDateTime,
    noOfGuests,
    roomRequired
  ];

  const handleSubmit = async () => {

    setIsLoading(true);
    const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
    if (!allFieldsNotEmpty){ 
      toast.warning('Fill all the Required fields');
      console.log(fieldsToCheckForValidation);
      setIsLoading(false);
      return;
    }
    if(coordinatorPhoneNumber.length !==10 || guestPhoneNumber.length !==10){
      toast.error("Enter 10 digit Phone Number");
      return;
    }
    if (!isAvailabilityChecked){
      toast.error(`Please check Availability`);
      setIsLoading(false);
      return;
    }

    //Check for unavailability of hall before sending request
    const response = await axios.get("/guesthouse/checkAvailablity", {params: {startDate: moment(startDateTime.toString()).format("YYYY-MM-DD"), endDate: moment(endDateTime.toString()).format("YYYY-MM-DD"), startTime: moment(startDateTime.toString()).format("HH:mm:ss"), endTime: moment(endDateTime.toString()).format("HH:mm:ss")}});
    const recentUnavailableRooms = response.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || [];

    if (recentUnavailableRooms.includes(roomRequired)){
      toast.info(`${roomRequired} is not available for this date and time.`);
      setIsLoading(false);
      return;
    }
    //Create booking

    // const formattedDateTime = moment(startDate).format("YYYY-MM-DD") + "T" + moment(startTime.toString()).format("HH:mm:ss");
    const res = await axios.post(`/guesthouse/create`,
      {
        userName,
        coordinatorName,
        coordinatorPhoneNumber,
        guestName, 
        guestPhoneNumber,
        organizingDepartment,
        purposeOfStay,
        foodRequired,
        menuRequired,
        paymentDoneBy,
        startDateTime,
        endDateTime,
        noOfGuests,
        roomRequired,
        specialRequirements,
      }
    );
    console.log("Response:", res);
    setPostStatus(res.data.message);
    setIsLoading(false);
    if (res.data.message === "true") {
      toast.success("Submitted");
    } else {
      console.log("not created guest house", postStatus)
      toast.error(postStatus);
      return;
    }
    setSelectedView('My Bookings');
  }


  return (
    <FormContainer title="Guest House Form">
      <CheckAvailability target={"guesthouse"}  />
      <TextInput label="Coordinator Name *" value={coordinatorName} setValue={setCoordinatorName} />
      <TextInput label="Coordinator Phone Number *" type="number" value={coordinatorPhoneNumber} setValue={setCoordinatorPhoneNumber} />
      <TextInput label="Guest Name *" value={guestName} setValue={setGuestName} />
      <TextInput label="Guest Phone Number *" type="number" value={guestPhoneNumber} setValue={setGuestPhoneNumber}/>
      <TextInput label="Organizing Department *" select={true} value={organizingDepartment} setValue={setOrganizingDepartment} options={allDepartments} />
      <TextInput label="Purpose of Stay *" value={purposeOfStay} setValue={setPurposeOfStay} />
      <TextInput label="Room Required *" select={true} value={roomRequired} setValue={setRoomRequired} options={allRooms} disabledOptions={unavailableGuestHouses} />
      <TextInput label="No. of Guests *" type='number' value={noOfGuests} setValue={setNoOfGuests} disabled={true} />
      <ChipsInput label="Food Required" value={foodRequired} setValue={setFoodRequired} options={allFoods} />
      <TextInput label="Menu Required *" select={true} value={menuRequired} setValue={setMenuRequired} options={allMenu} />
      <TextInput label="Payment Done By *" select={true} value={paymentDoneBy} setValue={setPaymentDoneBy} options={allPaymentOptions} />
      <TextInput label="Special Requirements *" multiline={true} value={specialRequirements} setValue={setSpecialRequirements}/>        
      <Button variant="contained" sx={{ display:"flex", gap: 1 }} onClick={handleSubmit} color={postStatus ? 'success' : 'primary'}>
        {isLoading ? <ReactLoading height={"20%"} width={"70%"} /> : postStatus ? <><span>Submitted</span> <Done /></> : <><span>Submit</span> <Send /></>  }
      </Button>
    </FormContainer>
  )
}

export default GuestHouseForm;