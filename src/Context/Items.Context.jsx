import React, { useState, createContext } from "react";

export const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {

    const [name, setName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [Designation, setDesignation] = useState('');
    const [Department, setDepartment] = useState('');
    const [EmpID,setEmpID]=useState('')
  
  
    return (
      <ItemsContext.Provider
        value={{
            //send all the created variables
            name, setName,
            EmpID, setEmpID,
            selectedDate, setSelectedDate,
            Designation, setDesignation,
            Department, setDepartment,

        }}
      >
        {children}
      </ItemsContext.Provider>
    );
  };
  
  export default ItemsProvider;
  