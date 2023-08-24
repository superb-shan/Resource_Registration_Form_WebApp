import React from 'react'
import sriEshwarCollegeImage from '../../Assets/Images/sriEshwarCollegeImage.png'

export const Wrapper = ({children, ...props}) => {
  return (
    <div className="background-image bg-cover bg-center w-full min-h-[96vh]" style={{backgroundImage: `url(${sriEshwarCollegeImage})`}}>
      <div className={`flex justify-${props.alignment} items-center min-h-[96vh] flex-col`} style={{backgroundColor: 'rgba(25, 118, 210, 0.9)'}}>
        { children }
      </div>
    </div>
  )
}
