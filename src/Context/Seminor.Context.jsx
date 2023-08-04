import React, { useState, createContext } from "react";

export const SeminorContext = createContext();

const SeminorProvider = ({ children }) => {

    const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [noOfAttendees, setNoOfAttendees] = useState('');
  const [equipmentNeeded, setEquipmentNeeded] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  
  
    return (
      <SeminorContext.Provider
        value={{
            //send all the created variables
            name, setName,
            contactNumber, setContactNumber,
            designation, setDesignation,
            department, setDepartment, purpose,
            startDate,
            endDate,
            startTime,
            endTime,
            noOfAttendees,
            equipmentNeeded,
            specialRequirements,
            setPurpose,
            setStartDate,
            setEndDate,
            setStartTime,
            setEndTime,
            setNoOfAttendees,
           setEquipmentNeeded,
            setSpecialRequirements,

        }}
      >
        {children}
      </SeminorContext.Provider>
    );
  };
  
  export default SeminorProvider;
  