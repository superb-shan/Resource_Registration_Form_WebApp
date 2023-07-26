import * as React from 'react';
import { LoginWrapper } from './Components/Login/LoginWrapper';

import UserWrapper from './User/UserWrapper';



export default function App() {

  return (
    <div className='font-[Poppins]'>
      {/* <LoginWrapper/> */}
      <UserWrapper />  {/* for trail purpose */}
    </div>
  );
}
