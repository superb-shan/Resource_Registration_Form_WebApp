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
import { DataContext } from '../../Context/Data.Context';

const allFoods = ['Breakfast', 'Lunch', 'Dinner', 'Tea & Snacks','None'];
const allPaymentOptions = ["Paid by institution", "Department", "Guest",'None'];
const allMenu = ["Elite", "Special", "Normal",'None'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

  const [open, setOpen] = React.useState(false);

  const [postStatus, setPostStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedView } = useContext(UserContext);
  const { userName } = useContext(LoginContext);
  const { allDepartments } = useContext(DataContext);
  const { allRooms, startDateTime,  endDateTime,  isGuestHouseAvailabilityChecked: isAvailabilityChecked, unavailableGuestHouses } = useContext(GuestHouseContext);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

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

    const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
    if (!allFieldsNotEmpty){ 
      toast.warning('Fill all the Required fields');
      setIsLoading(false);
      return;
    }
    if(coordinatorPhoneNumber.length !==10 ){
      toast.error("Enter 10 digit Phone Number");
      setIsLoading(false);
      return;
    }
    if (!isAvailabilityChecked){
      toast.error(`Please check Availability`);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // console.log({params: {startDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"), endDate: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss")}});
    //Check for unavailability of hall before sending request
    const response = await axios.get("/guesthouse/checkAvailability", {params: {startDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"), endDateTime: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss")}});
    const recentUnavailableRooms = response.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || [];

    if (recentUnavailableRooms.includes(roomRequired)){
      toast.info(`${roomRequired} is not available for this date and time.`);
      setIsLoading(false);
      return;
    }

    //Create booking
    console.log("Bookings test", startDateTime, endDateTime,  moment(startDateTime).format("YYYY-MM-DD HH:mm:ss")
        ,moment(endDateTime).format("YYYY-MM-DD HH:mm:ss"));
    // const formattedDateTime = moment(startDate).format("YYYY-MM-DD") + "T" + moment(startTime.toString()).format("HH:mm:ss");
    const res = await axios.post("/guesthouse/create",
      {
        userName,
        coordinatorName,
        coordinatorPhoneNumber,
        guestName, 
        guestPhoneNumber,
        organizingDepartment,
        purposeOfStay,
        foodRequired: foodRequired.toString(),
        menuRequired,
        paymentDoneBy,
        // startDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"),
        // endDateTime: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"),
        startDateTime,
        endDateTime,
        noOfGuests,
        roomRequired,
        specialRequirements,
      }
    );

    setPostStatus(res.data.message);
    setIsLoading(false);
    if (res.data.message === 'GuestHouse created successfully') {
      toast.success("Submitted");
    } else {
      toast.error(postStatus);
      return;
    }
    setSelectedView('My Bookings');
  }


  return (
    <FormContainer title="GuestHouse Requisition Form">
      <CheckAvailability target={"guesthouse"}  />
      <TextInput label="Coordinator Name *" value={coordinatorName} setValue={setCoordinatorName} />
      <TextInput label="Coordinator Phone Number *" type="number" value={coordinatorPhoneNumber} setValue={setCoordinatorPhoneNumber} />
      <TextInput label="Guest Name " value={guestName} setValue={setGuestName} />
      <TextInput label="Guest Phone Number " type="number" value={guestPhoneNumber} setValue={setGuestPhoneNumber}/>
      <TextInput label="Organizing Department *" select={true} value={organizingDepartment} setValue={setOrganizingDepartment} options={allDepartments} />
      <TextInput label="Purpose of Stay *" value={purposeOfStay} setValue={setPurposeOfStay} />
      <TextInput label="Room Required *" select={true} value={roomRequired} setValue={setRoomRequired} options={allRooms} disabledOptions={unavailableGuestHouses} disabled={!isAvailabilityChecked} />
      <TextInput label="No. of Guests *" type='number' value={noOfGuests} setValue={setNoOfGuests} disabled={true} />
      <ChipsInput label="Food Required *" value={foodRequired} setValue={setFoodRequired} options={allFoods} />
      <TextInput label="Menu Required *" select={true} value={menuRequired} setValue={setMenuRequired} options={allMenu} />
      <TextInput label="Payment Done By *" select={true} value={paymentDoneBy} setValue={setPaymentDoneBy} options={allPaymentOptions} />
      <TextInput label="Special Requirements " multiline={true} value={specialRequirements} setValue={setSpecialRequirements}/>        
      <Button variant="contained" disabled={isLoading} sx={{ display:"flex", gap: 1 }} onClick={()=>{handleOpen();handleSubmit();}} color={postStatus ? 'success' : 'primary'}>
        {isLoading ? <ReactLoading height={25} width={25} type='spin' /> : postStatus ? <><span>Submitted</span> <Done /></> : <><span>Submit</span> <Send /></>  }
      </Button>
    </FormContainer>
  )
}

export default GuestHouseForm;