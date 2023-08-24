import React, { useState, createContext } from "react";

export const SeminarContext = createContext();

const SeminarProvider = ({ children }) => {

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);

  const allHalls = ['Board Room', 'Ignite', 'GF-07', 'Placement Lab', 'IT center', 'Seminar Hall 1st Floor', 'Seminar Hall 2nd Floor', 'Others'];

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
  