import React, {useContext} from 'react';
import TransportContainer from '../Transport/TransportContainer';
import { UserContext } from '../Context/User.Context';

function UserContainer() {

  const {selectedForm} = useContext(UserContext);
  // console.log(selectedForm);

  return (
    
       <div className='bt-16 '>
        {( selectedForm === "Transport")? <TransportContainer/> : null  }
       </div>
    
  )
}

export default UserContainer
