import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [selectedView, setSelectedView] = useState('My Bookings');
  const [selectedForm, setSelectedForm] = useState('Transport');

    return (
      <UserContext.Provider
        value={{
          selectedForm,
          setSelectedForm,
          selectedView,
          setSelectedView
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;
  