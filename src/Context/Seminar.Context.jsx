import React, { useState, createContext } from "react";

export const SeminarContext = createContext();

const SeminarProvider = ({ children }) => {

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);
  const [hallCategory, setHallCategory] = useState('Auditorium/Training Halls');

  const allHalls = {
    'Auditorium/Training Halls': [
      { name: '1st floor Auditorium', maxCapacity: 400 },
      { name: '2nd floor Auditorium', maxCapacity: 400 },
      { name: 'IT Auditorium', maxCapacity: 120 },
      { name: 'Code Studio', maxCapacity: 166 },
      { name: '3rd Floor Drawing Hall', maxCapacity: 350 },
    ],
    'Special Labs': [
      { name: 'Makerspace', maxCapacity: 100 },
      { name: 'Ignite', maxCapacity: 100 },
      { name: 'Iot laboratory', maxCapacity: 100 },
      { name: 'GF-07', maxCapacity: 40 },
      { name: 'Cyber Security & Hypernet', maxCapacity: 75 },
      { name: 'AI Robo Space', maxCapacity: 75 },
    ],
    'Academic Labs': [
      { name: 'Bytes laboratory', maxCapacity: 64 },
      { name: 'IP laboratory', maxCapacity: 67 },
      { name: 'Fullstack laboratory', maxCapacity: 70 },
      { name: 'Project laboratory', maxCapacity: 72 },
      { name: 'CAD laboratory', maxCapacity: 72 },
      { name: 'Simulation laboratory', maxCapacity: 70 },
      { name: 'VLSI laboratory', maxCapacity: 44 },
      { name: 'ML laboratory', maxCapacity: 70 },
      { name: 'DS laboratory', maxCapacity: 70 },
      { name: 'AI laboratory', maxCapacity: 67 },
      { name: 'Business Analytics laboratory', maxCapacity: 74 },
      { name: 'PLC Automation laboratory', maxCapacity: 44 },
    ],
    'Board Rooms': [
      { name: 'Ignite Board Room', maxCapacity: 10 },
      { name: 'IQAC Board Room', maxCapacity: 10 },
      { name: 'Office Board Room', maxCapacity: 10 },
    ],
  };

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
        hallCategory, setHallCategory,
        allHalls,
      }}
    >
      {children}
    </SeminarContext.Provider>
  );
};

export default SeminarProvider;
