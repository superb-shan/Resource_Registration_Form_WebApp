import React from 'react'
import FormContainer from '../Containers/FormContainer';
import CheckAvailability from './CheckAvailability';

const CheckAvailabilityView = () => {
  return (
    <FormContainer title= "Check Availability" width="800px" padding='5'>
        <CheckAvailability />
    </FormContainer>
  )
}

export default CheckAvailabilityView