import React, { useState, createContext } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {

    // LoginSelector
    const [user, setUser] = useState('user');

    // LoginInputFields
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
  
    return (
      <LoginContext.Provider
        value={{
            //send all the created variables
            showPassword, 
            setShowPassword, 
            userName, 
            setUserName, 
            password, 
            setPassword
        }}
      >
        {children}
      </LoginContext.Provider>
    );
  };
  
  export default LoginProvider;
  