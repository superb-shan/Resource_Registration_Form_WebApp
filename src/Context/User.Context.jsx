import React, { useState, createContext, useContext } from "react";
import { LoginContext } from "./Login.Context";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const {user} = useContext(LoginContext);

  const [selectedView, setSelectedView] = useState(user==='user'?'My Calendar':'Calendar');
  const [selectedForm, setSelectedForm] = useState('Hall/Lab');
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
  