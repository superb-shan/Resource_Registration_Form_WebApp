import React from 'react'
import TransportContainer from './TransportContainer'

function TransportWrapper() {
  return (
    <>
    <header> 
      <h1 style={{color: "blue",backgroundColor:"orange",textAlign:"center", fontSize:"3rem"}} >Transportation Registration form</h1>
    </header>
    <div className='flex justify-center items-center h-screen bg-[#1976d2]'>
      <TransportContainer/>
    </div>
    <footer style={{color: "blue",backgroundColor:"orange",textAlign:"center", fontSize:"1rem"}}>
        for any querys contact shang2sree@gmail.com
    </footer>
    </>
  )
}

export default TransportWrapper
