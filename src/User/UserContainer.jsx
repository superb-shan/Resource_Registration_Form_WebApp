import React, {useContext} from 'react';
import TransportContainer from '../Transport/TransportContainer';
import { UserContext } from '../Context/User.Context';

function UserContainer() {

  const {selectedForm, selectedView} = useContext(UserContext);
  console.log(selectedView);

  return (
    
       <div className='bt-16 '>
        { selectedView === "Add Bookings" ?
        
        ( selectedForm === "Transport") ? <TransportContainer/> : null 

        :
        null
      }
       </div>
    
  )
}

export default UserContainer
