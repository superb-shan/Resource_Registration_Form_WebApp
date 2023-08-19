import React, { useState, createContext } from "react";
import { useEffect } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {

  const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const storedUserName = sessionStorage.getItem("userName") || "";

  //App
  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn);

  // LoginUserSelector
  const [user, setUser] = useState('user');

  // LoginInputFields
  const [userName, setUserName] = useState(storedUserName);
  const [password, setPassword] = useState("");

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem("userName", userName);
  }, [userName]);


  return (
    <LoginContext.Provider
      value={{
          //send all the created variables
          user,
          setUser,
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
  