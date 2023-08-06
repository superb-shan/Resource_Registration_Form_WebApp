import React, { useState, createContext } from "react";

export const SeminorContext = createContext();

const SeminorProvider = ({ children }) => {

  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [DesignationDepartment, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [noOfAttendees, setNoOfAttendees] = useState('');
  const [EquipmentRequired, setEquipmentNeeded] = useState([]);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const[requiredHall,setHall]=useState('')

  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
  const [unavailableHalls, setUnavailableHalls] = useState([]);
  
  
    return (
      <SeminorContext.Provider
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
            EquipmentRequired,
            specialRequirements,
            requiredHall,
            setPurpose,
            setStartDate,
            setEndDate,
            setStartTime,
            setEndTime,
            setNoOfAttendees,
           setEquipmentNeeded,
            setSpecialRequirements,
            setHall,
            isAvailabilityChecked, 
            setIsAvailabilityChecked,
            unavailableHalls, 
            setUnavailableHalls
        }}
      >
        {children}
      </SeminorContext.Provider>
    );
  };
  
  export default SeminorProvider;
  