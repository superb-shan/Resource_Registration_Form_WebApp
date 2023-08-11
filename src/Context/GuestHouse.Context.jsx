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
  const [noOfGuests, setNoOfGuests] = useState('1');
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
    'Amenities - Suite 01 - Bed 01',
    'Amenities - Suite 01 - Bed 02',
    'Amenities - Suite 02 - Bed 01',
    'Amenities - Suite 02 - Bed 02',
    'Amenities - Suite 03 - Bed 01',
    'Amenities - Suite 03 - Bed 02',
    'Main Block - SF Suite - Bed 01',
    'Main Block - SF Suite - Bed 02',
    'Main Block - TF Suite - Bed 01',
    'Main Block - TF Suite - Bed 02',
    'D Block Men\'s Hostel - Room No. 214 - Bed 01',
    'D Block Men\'s Hostel - Room No. 214 - Bed 02',
    'D Block Men\'s Hostel - Room No. 215 - Bed 01',
    'D Block Men\'s Hostel - Room No. 215 - Bed 02',
    'D Block Men\'s Hostel - Room No. 205 - Bed 01',
    'D Block Men\'s Hostel - Room No. 205 - Bed 02',
    'D Block Men\'s Hostel - Room No. 208 - Bed 01',
    'D Block Men\'s Hostel - Room No. 208 - Bed 02',
    'D Block Men\'s Hostel - Room No. 208 - Bed 03',
    'D Block Men\'s Hostel - Room No. 208 - Bed 04',
    'C Block Men\'s Hostel - Room No. 209 - Bed 01',
    'C Block Men\'s Hostel - Room No. 209 - Bed 02',
    'C Block Men\'s Hostel - Room No. 209 - Bed 03',
    'C Block Men\'s Hostel - Room No. 209 - Bed 04',
    'Bath not attached - Room No. 209 - Bed 01',
    'Bath not attached - Room No. 209 - Bed 02',
    'Bath not attached - Room No. 209 - Bed 03',
    'Bath not attached - Room No. 209 - Bed 04',
    'Bath not attached - Room No. 107 - Bed 01',
    'Bath not attached - Room No. 107 - Bed 02'
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
    if (!moment(endDateTime.toString()).isAfter(startDateTime.toString())) {
      toast.error('Start Time Should Be Before End Time with at least 1 hour slot');
      return;
    }

    setIsGuestHouseAvailabilityLoading(true);
    let arrival = moment(startDateTime.toString()).format("YYYY-MM-DD HH:mm:ss")
    let dept = moment(endDateTime.toString()).format("YYYY-MM-DD HH:mm:ss")
    const res = await axios.get("/guestHouse/checkAvailablity", { params: { DepartureDateTime:dept,ArrivialDateTime:arrival } });
    // console.log(res);
    setIsGuestHouseAvailabilityLoading(false);
    setIsGuestHouseAvailabilityChecked(true);
    setUnavailableGuestHouses(res.data.overlappingGusetHouses?.map(room => room.RequiredRoom) || []);
    console.log(res.data.overlappingGusetHouses?.map(room => room.RequiredRoom) || []);
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
