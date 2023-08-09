import React, { useState, createContext } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

export const GuestHouseContext = createContext();

const GuestHouseProvider = ({ children }) => {

  const [name, setName] = useState('');
  const [guestName, setGuestName] = useState('')
  const [contactNumber, setContactNumber] = useState('');
  const [designationDepartment, setDesignationDepartment] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [noOfGuests, setNoOfGuests] = useState('');
  const [foodRequired, setFoodRequired] = useState([]);
  const [menuRequired, setMenuRequired] = useState('');
  const [paymentDoneBy, setPaymentDoneBy] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [requiredRoom, setRequiredRoom] = useState('')

  const [isGuestHouseAvailabilityChecked, setIsGuestHouseAvailabilityChecked] = useState(false);
  const [isGuestHouseAvailabilityLoading, setIsGuestHouseAvailabilityLoading] = useState(false);
  const [unavailableGuestHouses, setUnavailableGuestHouses] = useState([]);

  const foodType = [
  {
    value: "Breakfast",
    label: "Breakfast"
  }, 
  {
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

  const menuType = [
    {
      value: "Elite",
      label: "Elite"

    },
    {
      value: "Special",
      label: "Special"

    },
    {
      value: "Normal",
      label: "Normal"
    }
  ]

  const paymentType = [
    {
      value: "Paid by institution",
      label: "Paid by institution"

    },
    {
      value: "Department",
      label: "Department"
    },
    {
      value: "Guest",
      label: "Guest"
    }
  ]

  const allRooms = [
    {value: "No 1", label: "No 1"},
    {value:"No 2",label:'No 2'},
    {value:"No 3",label:'No 3'},
    {value:"No 4",label:'No 4'},
    {value:"No 5",label:'No 5'}
  ]
  const handleGuestRoomCheckAvailability = async () => {
    if (!startDateTime || !endDateTime) {
      toast.warn("Please select a start/End Date/Time");
      return;
    }
    // if (!moment(startDate.toString()).isSameOrBefore(endDate.toString())) {
    //   toast.error('Start date should be same or before End date');
    //   return;
    // }
    // // if (!moment(startTime.toString()).isBefore(endTime.toString())){
    // if (!moment(endTime.toString()).isAfter(startTime.toString(), "hour")) {
    //   toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
    //   return;
    // }

    setIsGuestHouseAvailabilityLoading(true);
    // let arrival = `${startDate.toString()} ${startTime.toString()}`
    // let dept = `${endDate.toString()} ${endTime.toString()}`
    // const res = await axios.get("/guestHouse/checkAvailablity", { params: { Departure:dept,ArrivialDateTime:arrival } });
    // console.log(res);
    setIsGuestHouseAvailabilityLoading(false);
    setIsGuestHouseAvailabilityChecked(true);
    // setUnavailableHalls(res.data.overlappingSeminars?.map(seminar => seminar.requiredHall) || []);
    // console.log(unavailableHalls);
  }


  return (
    <GuestHouseContext.Provider
      value={{

        //send all the created variables
        
        name, setName,
        guestName, setGuestName,
        contactNumber, setContactNumber,
        designationDepartment, setDesignationDepartment,
        purpose, setPurpose,
        startDateTime, setStartDateTime,
        endDateTime, setEndDateTime,
        noOfGuests, setNoOfGuests,
        foodRequired, setFoodRequired,
        menuRequired, setMenuRequired,
        paymentDoneBy, setPaymentDoneBy,
        specialRequirements, setSpecialRequirements,
        requiredRoom, setRequiredRoom,
        isGuestHouseAvailabilityChecked, setIsGuestHouseAvailabilityChecked,
        isGuestHouseAvailabilityLoading, setIsGuestHouseAvailabilityLoading,
        unavailableGuestHouses, setUnavailableGuestHouses,
        foodType,
        menuType,
        paymentType,
        handleGuestRoomCheckAvailability,
        allRooms
      }}
    >
      {children}
    </GuestHouseContext.Provider>
  );
};

export default GuestHouseProvider;
