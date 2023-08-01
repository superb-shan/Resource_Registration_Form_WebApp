import React from 'react'
import TransportContainer from './TransportContainer'

function TransportWrapper() {
  return (
    <>
    <header> 
      <h1 style={{color: "blue",backgroundColor:"orange",textAlign:"center", fontSize:"3rem"}} >Transportation Registration form</h1>
    </header>
    <div className='flex justify-center items-center h-screen bg-fixed bg-[#1976d2]'>
      <TransportContainer/>
    </div>
    
    </>
  )
}

export default TransportWrapper
