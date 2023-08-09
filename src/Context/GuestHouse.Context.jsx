import React, { useState, createContext } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

export const GuestHouseContext = createContext();

const GuestHouseProvider = ({ children }) => {

  const [name, setName] = useState('');
  const [guestName,setGuestName] = useState('')
  const [contactNumber, setContactNumber] = useState('');
  const [DesignationDepartment, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [noOfAttendees, setNoOfAttendees] = useState('');
  const [FoodRequired, setFoodRequired] = useState([]);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [requiredHall, setHall] = useState('')

  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);

  const Food = [{
    value: "Breakfast",
    label: "Breakfast"

  }, {
    value: "Lunch",
    label: "Lunch"

  },
  {
    value: "Dinner",
    label: "Dinner"
  },
  {
    value: "Tea & Snacks",
    label: "Tea & Snacks"
  },
  ];


  const TypeOfAcc = [
    {
      value: 'Single Room',
      label: 'Single Room'
    },
    {
      value: 'Double Room',
      label: 'Double Room'
    },
    {
      value: 'Suite',
      label: 'Suite'
    },
  ];
  const Menu = [
    {
      value: "Elite",
      lable: "Elite"

    },
    {
      value: "Special",
      lable: "Special"

    },
    {
      value: "Normal",
      lable: "Normal"
    }
  ]

  const Payment = [
    {
      value: "Paid by institution",
      lable: "Paid by institution"

    },
    {
      value: "Department",
      lable: "Department"
    },
    {
      value: "Guest",
      lable: "Guest"
    }
  ]
  const handleCheckAvailability = async () => {
    if (!startTime || !endTime) {
      toast.warn("Please select a start and end time");
      return;
    }
    if (!startDate || !endDate) {
      toast.warn("Please select a start and end Date");
      return;
    }
    if (!moment(startDate.toString()).isSameOrBefore(endDate.toString())) {
      toast.error('Start date should be same or before End date');
      return;
    }
    // if (!moment(startTime.toString()).isBefore(endTime.toString())){
    if (!moment(endTime.toString()).isAfter(startTime.toString(), "hour")) {
      toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
      return;
    }

    setIsAvailabilityLoading(true);
    let arrival = `${startDate.toString()} ${startTime.toString()}`
    let dept = `${endDate.toString()} ${endTime.toString()}`
    const res = await axios.get("/guestHouse/checkAvailablity", { params: { Departure:dept,ArrivialDateTime:arrival } });
    console.log(res);
    setIsAvailabilityLoading(false);
    setIsAvailabilityChecked(true);
    setUnavailableHalls(res.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || []);
    // console.log(unavailableHalls);
  }


  return (
    <GuestHouseContext.Provider
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
        specialRequirements,
        requiredHall,
        setPurpose,
        setStartDate,
        setEndDate,
        setStartTime,
        setEndTime,
        setNoOfAttendees,
        setSpecialRequirements,
        setHall,
        isAvailabilityChecked,
        setIsAvailabilityChecked,
        unavailableHalls,
        setUnavailableHalls,
        isAvailabilityLoading,
        setIsAvailabilityLoading,
        handleCheckAvailability,
        Food,
        TypeOfAcc,
        Menu,
        Payment,
        FoodRequired,
        setFoodRequired,
        guestName,setGuestName
      }}
    >
      {children}
    </GuestHouseContext.Provider>
  );
};

export default GuestHouseProvider;
