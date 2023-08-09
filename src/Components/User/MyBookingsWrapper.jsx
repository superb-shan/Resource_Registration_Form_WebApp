import React from 'react'
import MyBookingslist from './MyBookingslist'

function MyBookingsWrapper() {
  return (
    <div className='p-10 [@media(max-width:640px)]:p-5 h-[90.7vh] bg-fixed bg-[#1976d2] flex items-start'>
      <MyBookingslist />
    </div>
  )
}

export default MyBookingsWrapper
