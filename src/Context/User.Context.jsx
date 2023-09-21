import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [selectedView, setSelectedView] = useState('Calendar');
  const [selectedForm, setSelectedForm] = useState('Transport');
  const [selectedDate, setSelectedDate] = useState(null)

    return (
      <UserContext.Provider
        value={{
          selectedForm,
          setSelectedForm,
          selectedView,
          setSelectedView,
          selectedDate,
           setSelectedDate
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;
  