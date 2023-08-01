import * as React from 'react';
import { LoginWrapper } from './Components/Login/LoginWrapper';

import UserWrapper from './User/UserWrapper';
import TransportWrapper from './Transport/TransportWrapper';



export default function App() {

  return (
    <div className='font-[Poppins]'>
      {/* <LoginWrapper/> */}
      <UserWrapper />  
      {/* <TransportWrapper /> */}
    </div>
  );
}
