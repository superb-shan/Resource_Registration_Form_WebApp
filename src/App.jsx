import * as React from 'react';
import { LoginWrapper } from './Components/Login/LoginWrapper';

import UserWrapper from './User/UserWrapper';
import { LoginContext } from './Context/Login.Context';
import UserProvider from './Context/User.Context';
import { useContext } from 'react';


export default function App() {

  const {user, isLoggedIn} = useContext(LoginContext);

  return (
    <div className='font-[Poppins]'>
      
      {
      (user === "user" && isLoggedIn) ?
        <UserProvider>
          <UserWrapper />
        </UserProvider>
      :
        <LoginWrapper/>
      }
      
      {/* <TransportWrapper /> */}
    </div>
  );
}
