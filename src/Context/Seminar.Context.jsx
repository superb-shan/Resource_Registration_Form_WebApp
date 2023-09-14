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
    { name: 'Code Studio', maxCapacity: 15 },
    { name: 'IT center', maxCapacity: 15 },
    { name: 'Auditorium 1st Floor', maxCapacity: 15 },
    { name: 'Auditorium Hall 2nd Floor', maxCapacity: 15 },
    { name: '3rd Floor Drawing Hall', maxCapacity: 15 },
    { name: 'Maker Space', maxCapacity: 15 },
    { name: 'AI Robo Space', maxCapacity: 15 },
    { name: 'Bytes Lab', maxCapacity: 15 },
    { name: 'CCE Lab', maxCapacity: 15 },
    { name: 'AIDS Lab', maxCapacity: 15 },
    { name: 'CSBS Lab', maxCapacity: 15 },
    { name: 'Fullstack Lab', maxCapacity: 15 },
    { name: 'ECE Lab', maxCapacity: 15 },
    { name: '2nd Floor project Lab', maxCapacity: 15 },
    { name: 'CAD Lab', maxCapacity: 15 },



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
