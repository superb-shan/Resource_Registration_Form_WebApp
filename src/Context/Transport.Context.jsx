import React, { useState, createContext } from "react";

export const TransportContext = createContext();

const TransportProvider = ({ children }) => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [purposeOfTravel, setPurposeOfTravel] = useState('');
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
            name, setName,
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
  