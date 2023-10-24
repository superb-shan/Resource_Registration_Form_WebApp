import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../Context/User.Context';
import TransportForm from './TransportForm';
import SeminarHallForm from './SeminarHallForm';
import GuestHouseForm from './GuestHouseForm';
import ItemsForm from './ItemsForm';
import FoodForm from './FoodForm';


const Forms = () => {

    const {selectedForm} = useContext(UserContext);

  return (
    <>
      {
        selectedForm === "Transport"? <TransportForm /> :
        selectedForm === "Hall/Lab"? <SeminarHallForm /> : 
        selectedForm === "Guest House"? <GuestHouseForm /> :
        selectedForm === "Food/Refreshment"? <FoodForm /> :
        selectedForm === "Items"? <ItemsForm /> : null 
      }
    </>
  )
}

export default Forms