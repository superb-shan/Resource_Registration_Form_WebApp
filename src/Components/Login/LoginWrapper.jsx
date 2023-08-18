import React from 'react'
import { LoginContainer } from './LoginContainer'
import sriEshwarCollegeImage from '../../Images/sriEshwarCollegeImage.png'

export const LoginWrapper = () => {
  return (
    <div className="background-image bg-cover bg-center w-full h-full" style={{backgroundImage: `url(${sriEshwarCollegeImage})`}}>
      <div className='flex justify-center items-center h-[96vh]' style={{backgroundColor: 'rgba(25, 118, 210, 0.9)'}}>
        <LoginContainer />
      </div>
    </div>
  )
}
