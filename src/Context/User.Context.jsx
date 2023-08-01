import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [selectedForm, setSelectedForm] = useState('');

    return (
      <UserContext.Provider
        value={{
          selectedForm,
          setSelectedForm
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;
  