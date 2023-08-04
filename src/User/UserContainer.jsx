import React, {useContext} from 'react';
import TransportContainer from '../Transport/TransportContainer';
import SeminorHallWrapper from '../SeminorHall/SeminorHallWrapper';
import { UserContext } from '../Context/User.Context';
import MyBookingsWrapper from './MyBookingsWrapper';

function UserContainer() {

  const {selectedForm, selectedView} = useContext(UserContext);
  console.log(selectedView);

  return (
    
       <div className='bt-16 '>
        { selectedView === "Add Bookings" ?
        
        ( selectedForm === "Transport") ? <TransportContainer/> 
         :  ( selectedForm === "Seminar Hall") ? <SeminorHallWrapper/> : null

        :
        <MyBookingsWrapper />
        
      }
       </div>
    
  )
}

export default UserContainer
