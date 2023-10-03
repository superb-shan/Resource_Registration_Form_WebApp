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
import { SeminarContext } from '../../Context/Seminar.Context';
import { DataContext } from '../../Context/Data.Context';

const allEquipments = ['Audio', 'Video', 'Reception items', 'Power Back up', 'Others'];

const SeminarHallForm = () => {

  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorPhoneNumber, setCoordinatorPhoneNumber] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [speakerPhoneNumber, setSpeakerPhoneNumber] = useState('');
  const [organizingDepartment, setOrganizingDepartment] = useState('');
  const [topic, setTopic] = useState('');
  const [noOfAttendees, setNoOfAttendees] = useState('');
  const [equipmentsRequired, setEquipmentsRequired] = useState([]);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [hallRequired, setHallRequired] = useState('');


  const [postStatus, setPostStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedView } = useContext(UserContext);
  const { userName } = useContext(LoginContext);
  const { allHalls, startDateTime, endDateTime, isAvailabilityChecked, unavailableHalls, setIsAvailabilityChecked, hallCategory } = useContext(SeminarContext);
  const { setIsAvailabilityLoading, allDepartments } = useContext(DataContext);


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
    if (!allFieldsNotEmpty) {
      toast.warning('Fill all the Required fields');
      setIsLoading(false);
      return;
    }
    if (coordinatorPhoneNumber.length !== 10 || speakerPhoneNumber.length !== 10) {
      toast.error("Enter 10 digit Phone Number");
      return;
    }
    if (noOfAttendees <= 0) {
      toast.error("No of Attendees is not valid");
      return;
    }
    if (!isAvailabilityChecked) {
      toast.error(`Please check Availability`);
      setIsLoading(false);
      return;
    }

    //Check for unavailability of hall before sending request
    const response = await axios.get("/seminar/checkAvailability", { params: { startDateTime: moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss"), endDateTime: moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss") } });
    const recentUnavailableHalls = response.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || [];

    if (recentUnavailableHalls.includes(hallRequired)) {
      toast.info(`${hallRequired} is not available for this date and time.`);
      setIsLoading(false);
      return;
    }
    if (noOfAttendees > allHalls[hallCategory].find(hall => hall.name === hallRequired)?.maxCapacity) {
      if (!window.confirm("Entered capacity exceed maximum capacity, do you still want to continue?")) {
        setIsLoading(false);
        return;
      }
    }

    //Create booking
    console.log({
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
      equipmentsRequired: equipmentsRequired.join(", "),
      hallRequired,
      specialRequirements,
    })
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
        equipmentsRequired: equipmentsRequired.join(", "),
        hallRequired,
        specialRequirements,
        category: hallCategory
      }
    );
    // console.log("Response:", res);
    setPostStatus(res.data.message);
    setIsLoading(false);
    if (res.data.message === "true") {
      toast.success("Submitted");
    } else {
      console.log("not created seminar", res)
      toast.error(postStatus);
      return;
    }
    setIsAvailabilityChecked(false);
    setSelectedView('My Bookings');
  }


  return (
    <FormContainer title="Seminar Hall Form" >
      <CheckAvailability target={"seminar"} />
      <TextInput label="Coordinator Name *" value={coordinatorName} setValue={setCoordinatorName} />
      <TextInput label="Coordinator Phone Number *" type="number" value={coordinatorPhoneNumber} setValue={setCoordinatorPhoneNumber} />
      <TextInput label="Speaker Name *" value={speakerName} setValue={setSpeakerName} />
      <TextInput label="Speaker Phone Number *" type="number" value={speakerPhoneNumber} setValue={setSpeakerPhoneNumber} />
      <TextInput label="Organizing Department *" select={true} value={organizingDepartment} setValue={setOrganizingDepartment} options={allDepartments} />
      <TextInput label="Topic *" value={topic} setValue={setTopic} />
      {/* {console.log("unav", unavailableHalls)} */}
      <TextInput label="Hall Required *" select={true} value={hallRequired} setValue={setHallRequired} options={allHalls[hallCategory]} disabledOptions={unavailableHalls} disabled={!isAvailabilityChecked} />
      <TextInput label="No. of Attendees *" type='number' value={noOfAttendees} setValue={setNoOfAttendees} />
      <ChipsInput label="Equipments Required" value={equipmentsRequired} setValue={setEquipmentsRequired} options={allEquipments} />
      <TextInput label="Special Requirements " multiline={true} value={specialRequirements} setValue={setSpecialRequirements} />
      <Button variant="contained" sx={{ display: "flex", gap: 1 }} onClick={handleSubmit} color={postStatus ? 'success' : 'primary'}>
        {isLoading ? <ReactLoading height={"20%"} width={"70%"} /> : postStatus ? <><span>Submitted</span> <Done /></> : <><span>Submit</span> <Send /></>}
      </Button>
    </FormContainer>
  )
}

export default SeminarHallForm