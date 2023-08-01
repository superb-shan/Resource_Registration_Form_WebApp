import React, { useState, createContext } from "react";

export const TransportContext = createContext();

const TransportProvider = ({ children }) => {

    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [purposeOfTravel, setPurposeOfTravel] = useState('default');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [noOfPassengers, setNoOfPassengers] = useState(1);
    const [specialRequirement, setSpecialRequirement] = useState('');
  
  
    return (
      <TransportContext.Provider
        value={{
            //send all the created variables
            userName, setUserName,
            phoneNumber, setPhoneNumber,
            purposeOfTravel, setPurposeOfTravel,
            selectedDate, setSelectedDate,
            selectedTime, setSelectedTime,
            pickupLocation, setPickupLocation,
            dropLocation, setDropLocation,
            noOfPassengers, setNoOfPassengers,
            specialRequirement, setSpecialRequirement

        }}
      >
        {children}
      </TransportContext.Provider>
    );
  };
  
  export default TransportProvider;
  