import React, { useState, createContext } from "react";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {

    const [userData, setUserData] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
  
  
    return (
      <AdminContext.Provider
        value={{
            //send all the created variables
            userData, setUserData,
            selectedDate, setSelectedDate
        }}
      >
        {children}
      </AdminContext.Provider>
    );
  };
  
  export default AdminProvider;
  