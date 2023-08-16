import React from 'react'
import MyBookingslist from './MyBookingslist'
import sriEshwarCollegeImage from '../../Images/sriEshwarCollegeImage.png'

function MyBookingsWrapper() {
  return (
    <div class="background-image bg-cover bg-center w-full h-full" style={{backgroundImage: `url(${sriEshwarCollegeImage})`}}>
      <div className='p-10 [@media(max-width:640px)]:p-5 h-[90.7vh] [@media(max-width:640px)]:h-auto bg-fixed flex items-start' style={{backgroundColor: 'rgba(25, 118, 210, 0.9)'}}>
        <MyBookingslist />
      </div>
    </div>
  )
}

export default MyBookingsWrapper
