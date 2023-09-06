import React, { useState, createContext } from "react";

export const GuestHouseContext = createContext();

const GuestHouseProvider = ({ children }) => {

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [isGuestHouseAvailabilityChecked, setIsGuestHouseAvailabilityChecked] = useState(false);
  const [isGuestHouseAvailabilityLoading, setIsGuestHouseAvailabilityLoading] = useState(false);
  const [unavailableGuestHouses, setUnavailableGuestHouses] = useState([]);

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
  
  return (
    <GuestHouseContext.Provider
      value={{
        //send all the created variables
        startDateTime, setStartDateTime,
        endDateTime, setEndDateTime,
        isGuestHouseAvailabilityChecked, setIsGuestHouseAvailabilityChecked,
        isGuestHouseAvailabilityLoading, setIsGuestHouseAvailabilityLoading,
        unavailableGuestHouses, setUnavailableGuestHouses,
        allRooms
      }}
    >
      {children}
    </GuestHouseContext.Provider>
  );
};

export default GuestHouseProvider;
