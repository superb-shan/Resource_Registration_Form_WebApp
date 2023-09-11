import React, { useState, createContext } from "react";

export const SeminarContext = createContext();

const SeminarProvider = ({ children }) => {

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);

  const allHalls = [
    { name: 'Board Room', maxCapacity: 15 },
    { name: 'Ignite', maxCapacity: 15 },
    { name: 'GF-07', maxCapacity: 15 },
    { name: 'Placement Lab', maxCapacity: 15 },
    { name: 'IT center', maxCapacity: 15 },
    { name: 'Seminar Hall 1st Floor', maxCapacity: 15 },
    { name: 'Seminar Hall 2nd Floor', maxCapacity: 15 },
    { name: 'Others', maxCapacity: 15 }
  ]
  ;

    return (
      <SeminarContext.Provider
        value={{
            //new 
            isAvailabilityChecked, 
            setIsAvailabilityChecked,
            unavailableHalls, 
            setUnavailableHalls,
            startDateTime, setStartDateTime,
            endDateTime, setEndDateTime,
            allHalls,
        }}
      >
        {children}
      </SeminarContext.Provider>
    );
  };
  
  export default SeminarProvider;
  