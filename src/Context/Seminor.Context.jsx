import React, { useState, createContext } from "react";
import moment from "moment";
import axios from "axios";
import {toast} from "react-toastify";

export const SeminorContext = createContext();

const SeminorProvider = ({ children }) => {

  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [DesignationDepartment, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [noOfAttendees, setNoOfAttendees] = useState('');
  const [EquipmentRequired, setEquipmentNeeded] = useState([]);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const[requiredHall,setHall]=useState('')

  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);

  const eventEquipment = [{
    value: "Audio",
    label: "Audio"

  }, {
    value: "Video",
    label: "Video"

  },
  {
    value: "Reception items",
    label: "Reception items"
  },
  {
    value: "Power Back up",
    label: "Power Back up"
  }, {
    value: "Others",
    label: "Others"
  }
  ];


  const eventHall = [
    {
      value: 'Board Room',
      label: 'Board Room'
    },
    {
      value: 'Ignite',
      label: 'Ignite'
    },
    {
      value: 'GF-07',
      label: 'GF-07'
    },
    {
      value: 'Placement Lab',
      label: 'Placement Lab'
    },
    {
      value: 'IT center',
      label: 'IT center'
    }, {
      value: 'Seminor Hall 1st Floor',
      label: 'Seminor Hall 1st Floor'
    }, {
      value: 'Seminor Hall 2nd Floor',
      label: 'Seminor Hall 2nd Floor'
    },
    {
      value: 'Others',
      label: 'Others'
    }
  ];

  const isWithinNextTwoMonths = (givenDate) => {
    if (!givenDate) {
      return false;
    }

    //moment() -> gives current DateTime
    const twoMonthsFromNow = moment().add(2, 'months');

    return moment(givenDate.toString()).isBefore(twoMonthsFromNow.toString(), 'day'); // returns true or false
  };

  const handleCheckAvailability = async () => {
    console.log("inside CA");
    if (!startTime || !endTime){
      toast.warn("Please select a start and end time");
      return;
    }
    if (!startDate || !endDate){
      toast.warn("Please select a start and end Date");
      return;
    }
    if (!moment(startDate.toString()).isSameOrBefore(endDate.toString())){
      toast.error('Start date should be same or before End date');
      return;
    }
    // if(moment(endDate).isSame(moment(startDate)) && moment(endTime).isSameOrBefore(moment(startTime), 'hour')){
    //   toast.error("Start Time Should Be Before End Time with at least 1 hour slot");
    //   return;
    // }

    // const startDateTime = moment(`${startDate} ${startTime}`, 'DD-MM-YYYY HH:mm A');
    // const endDateTime = moment(`${endDate} ${endTime}`, 'DD-MM-YYYY HH:mm A');
    // if(moment(endDate).isSame(moment(startDate)) && moment(endDateTime).isSameOrBefore(moment(startDateTime), 'hour')){
    //   toast.error("Start Time Should Be Before End Time with at least 1 hour slot");
    //   return;
    // }

    // console.log("s:", startDateTime, "e:", endDateTime);
    // if (endDateTime.isBefore(startDateTime)) {
    //   console.log("s:", startDateTime, "e:", endDateTime);
    //   toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
    //   return;
    // }
    if(!moment(endTime.toString()).isAfter(moment(startTime.toString()), 'hour')){
      toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
      return;
    }
    if (!isWithinNextTwoMonths(startDate) || !isWithinNextTwoMonths(endDate)){
      toast.info('You can only book Halls within next months');
      return;
    }

    setIsAvailabilityLoading(true);
    const res = await axios.get("/seminar/checkAvailability", {params: {startDate: moment(startDate.toString()).format("YYYY-MM-DD"), endDate: moment(endDate.toString()).format("YYYY-MM-DD"), startTime: moment(startTime.toString()).format("HH:mm:ss"), endTime: moment(endTime.toString()).format("HH:mm:ss")}});
    console.log(res);
    setIsAvailabilityLoading(false);
    setIsAvailabilityChecked(true);
    setUnavailableHalls(res.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || []);
  }
  
  
    return (
      <SeminorContext.Provider
        value={{
            //send all the created variables
            name, setName,
            contactNumber, setContactNumber,
            DesignationDepartment, setDesignation,
            department, setDepartment, purpose,
            startDate,
            endDate,
            startTime,
            endTime,
            noOfAttendees,
            EquipmentRequired,
            specialRequirements,
            requiredHall,
            setPurpose,
            setStartDate,
            setEndDate,
            setStartTime,
            setEndTime,
            setNoOfAttendees,
           setEquipmentNeeded,
            setSpecialRequirements,
            setHall,
            isAvailabilityChecked, 
            setIsAvailabilityChecked,
            unavailableHalls, 
            setUnavailableHalls,
            isAvailabilityLoading, 
            setIsAvailabilityLoading,
            handleCheckAvailability,
            eventEquipment,
            eventHall
        }}
      >
        {children}
      </SeminorContext.Provider>
    );
  };
  
  export default SeminorProvider;
  