import React, { useState, createContext } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {

    //App
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // LoginUserSelector
    const [user, setUser] = useState('user');

    // LoginInputFields
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  
  
    return (
      <LoginContext.Provider
        value={{
            //send all the created variables
            user,
            setUser,
            showPassword, 
            setShowPassword, 
            userName, 
            setUserName, 
            password, 
            setPassword,
            isLoggedIn,
            setIsLoggedIn,
        }}
      >
        {children}
      </LoginContext.Provider>
    );
  };
  
  export default LoginProvider;
  