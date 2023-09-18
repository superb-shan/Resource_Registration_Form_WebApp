import React, { useState, createContext } from "react";

export const SeminarContext = createContext();

const SeminarProvider = ({ children }) => {

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);

  const allHalls = [
    { name: 'Bytes laboratory ', maxCapacity: 64 },
    { name: 'IP laboratory', maxCapacity: 67 },
    { name: 'GF-07', maxCapacity: 40 },
    { name: 'Fullstack laboratory', maxCapacity: 70 },
    { name: 'Project laboratory', maxCapacity: 72 },
    { name: 'Auditorium 1st Floor', maxCapacity: 400 },
    { name: 'Auditorium  2nd Floor', maxCapacity: 400 },
    { name: '3rd Floor Drawing Hall', maxCapacity: 350 },
    { name: 'Simulation laboratory', maxCapacity: 70 },
    { name: 'PG laboratory', maxCapacity: 44 },
    { name: 'Code studio', maxCapacity: 166 },
    { name: 'CAD laboratory', maxCapacity: 72 },
    { name: 'ML laboratory', maxCapacity: 70 },
    { name: 'AI laboratory', maxCapacity: 67 },
    { name: 'Cyber Security & Hypernet ', maxCapacity: 75 },
    { name: 'Mechatronics laboratory', maxCapacity: 12 },
    { name: 'Business Analytics laboratory', maxCapacity: 74 },
    { name: 'PLC Automation laboratory', maxCapacity: 44 },
    { name: 'AI Robo space', maxCapacity: 100 },
    { name: 'Makerspace', maxCapacity: 100 },
    { name: 'Ignite', maxCapacity: 100 },
    { name: 'Iot laboratory', maxCapacity: 100 },
    { name: 'Board Room', maxCapacity: 100 },



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
