import React from 'react'
import { useState } from 'react';
import FormContainer from './FormContainer';
import { ChipsInput, DateTimeInput, TextInput } from './InteractionFields';
import { useContext } from 'react';
import { UserContext } from '../../Context/User.Context';
import { LoginContext } from '../../Context/Login.Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { Done, Send } from '@mui/icons-material';
import ReactLoading from 'react-loading';
import { Button } from '@mui/material';
import CheckAvailability from './CheckAvailability';

const allHalls = ['Board Room', 'Ignite', 'GF-07', 'Placement Lab', 'IT center', 'Seminar Hall 1st Floor', 'Seminar Hall 2nd Floor', 'Others'];
const allDepartments = ['CSE', 'ECE', 'EEE', 'AI&DS/ML', 'IT', 'MECH', 'CCE', 'CSBS', 'PLAC', 'SH'];
const allEquipments = ['Audio', 'Video', 'Reception items', 'Power Back up', 'Others'];

const SeminarHallForm = () => {

  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorPhoneNumber, setCoordinatorPhoneNumber] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [speakerPhoneNumber, setSpeakerPhoneNumber] = useState('');
  const [organizingDepartment, setOrganizingDepartment] = useState('');
  const [topic, setTopic] = useState('');
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [noOfAttendees, setNoOfAttendees] = useState('');
  const [equipmentsRequired, setEquipmentsRequired] = useState([]);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [hallRequired, setHallRequired] = useState('');

  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);

  const [postStatus, setPostStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedView } = useContext(UserContext);
  const { userName } = useContext(LoginContext);

  

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
    speakerName,
    speakerPhoneNumber,
    organizingDepartment,
    topic,
    startDateTime,
    endDateTime,
    noOfAttendees,
    equipmentsRequired,
    hallRequired
  ];

  const handleSubmit = async () => {

    setIsLoading(true);
    const allFieldsNotEmpty = areAllFieldsNotEmpty(fieldsToCheckForValidation);
    if (!allFieldsNotEmpty){ 
      toast.warning('Fill all the Required fields');
      setIsLoading(false);
      return;
    }
    if(coordinatorPhoneNumber.length !=='10' || speakerPhoneNumber.length !=='10'){
      toast.error("Enter 10 digit Phone Number");
      return;
    }
    if (noOfAttendees <= 0 ){
      toast.error("No of Attendees is not valid");
      return;
    }
    if (!isAvailabilityChecked){
      toast.error(`Please check Availability`);
      setIsLoading(false);
      return;
    }

    //Check for unavailability of hall before sending request
    const response = await axios.get("/seminar/checkAvailability", {params: {startDate: moment(startDateTime.toString()).format("YYYY-MM-DD"), endDate: moment(endDateTime.toString()).format("YYYY-MM-DD"), startTime: moment(startDateTime.toString()).format("HH:mm:ss"), endTime: moment(endDateTime.toString()).format("HH:mm:ss")}});
    const recentUnavailableHalls = response.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || [];

    if (recentUnavailableHalls.includes(hallRequired)){
      toast.info(`${hallRequired} is not available for this date and time.`);
      setIsLoading(false);
      return;
    }
    //Create booking

    // const formattedDateTime = moment(startDate).format("YYYY-MM-DD") + "T" + moment(startTime.toString()).format("HH:mm:ss");
    const res = await axios.post(`/seminar/create`,
    {
      userName,
      coordinatorName,
      coordinatorPhoneNumber,
      speakerName,
      speakerPhoneNumber,
      organizingDepartment,
      topic,
      startDateTime,
      endDateTime,
      noOfAttendees,
      equipmentsRequired,
      specialRequirements,
      hallRequired
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

  const startDateTimeData={ label:"Start Date & Time *", value: startDateTime, setValue: setStartDateTime }
  const endDateTimeData={ label:"End Date & Time *", value: endDateTime, setValue: setEndDateTime }

  return (
    <FormContainer title="Seminar Hall Form">
      <CheckAvailability startDateTimeData={startDateTimeData} endDateTimeData={endDateTimeData} isAvailabilityChecked={isAvailabilityChecked} setIsAvailabilityChecked={setIsAvailabilityChecked} allHalls={allHalls} unavailableHalls={unavailableHalls} setUnavailableHalls={setUnavailableHalls} />
      <TextInput label="Coordinator Name *" value={coordinatorName} setValue={setCoordinatorName} />
      <TextInput label="Coordinator Phone Number *" type="number" value={coordinatorPhoneNumber} setValue={setCoordinatorPhoneNumber} />
      <TextInput label="Speaker Name *" value={speakerName} setValue={setSpeakerName} />
      <TextInput label="Speaker Phone Number *" type="number" value={speakerPhoneNumber} setValue={setSpeakerPhoneNumber}/>
      <TextInput label="Organizing Department *" select={true} value={organizingDepartment} setValue={setOrganizingDepartment} options={allDepartments} />
      <TextInput label="Topic *" value={topic} setValue={setTopic} />
      <TextInput label="Hall Required *" select={true} value={hallRequired} setValue={setHallRequired} options={allHalls} />
      <TextInput label="No. of Attendees *" type='number' value={noOfAttendees} setValue={setNoOfAttendees} />
      <ChipsInput label="Equipments Required" value={equipmentsRequired} setValue={setEquipmentsRequired} options={allEquipments} />
      <TextInput label="Special Requirements *" multiline={true} value={specialRequirements} setValue={setSpecialRequirements}/>        
      <Button variant="contained" sx={{ display:"flex", gap: 1 }} onClick={handleSubmit} color={postStatus ? 'success' : 'primary'}>
        {isLoading ? <ReactLoading height={"20%"} width={"70%"} /> : postStatus ? <><span>Submitted</span> <Done /></> : <><span>Submit</span> <Send /></>  }
      </Button>
    </FormContainer>
  )
}

export default SeminarHallForm