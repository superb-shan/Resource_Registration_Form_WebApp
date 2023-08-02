import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [selectedView, setSelectedView] = useState('Add Bookings');
  const [selectedForm, setSelectedForm] = useState('');

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
  