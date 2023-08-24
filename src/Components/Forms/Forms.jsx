import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../Context/User.Context';
import TransportForm from './TransportForm';
import SeminarHallForm from './SeminarHallForm';
import GuestHouseForm from './GuestHouseForm';
import ItemsForm from './ItemsForm';


const Forms = () => {

    const {selectedForm} = useContext(UserContext);
    console.log(selectedForm);

  return (
    <>
      {
        selectedForm === "Transport"? <TransportForm /> :
        selectedForm === "Seminar Hall"? <SeminarHallForm /> : 
        selectedForm === "Guest House"? <GuestHouseForm /> :
        selectedForm === "Items"? <ItemsForm /> : null 
      }
    </>
  )
}

export default Forms