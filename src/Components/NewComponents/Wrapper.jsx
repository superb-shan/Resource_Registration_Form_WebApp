import React from 'react'
import sriEshwarCollegeImage from '../../Images/sriEshwarCollegeImage.png'

export const Wrapper = ({children}) => {
  return (
    <div className="background-image bg-cover bg-center w-full min-h-[96vh]" style={{backgroundImage: `url(${sriEshwarCollegeImage})`}}>
      <div className='flex justify-center items-center min-h-[96vh]' style={{backgroundColor: 'rgba(25, 118, 210, 0.9)'}}>
        { children }
      </div>
    </div>
  )
}
