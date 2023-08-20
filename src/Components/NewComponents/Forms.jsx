import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../Context/User.Context';
import TransportForm from './TransportForm';
import SeminarHallForm from './SeminarHallForm';


const Forms = () => {

    const {selectedForm} = useContext(UserContext);
    console.log(selectedForm);

  return (
    <>
        {selectedForm === "Transport"? <TransportForm /> :
         selectedForm === "Seminar Hall"? <SeminarHallForm /> : null }
    </>
  )
}

export default Forms