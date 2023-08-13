import React from 'react'
import AdminViewTable from './AdminViewTable'
import AdminNavBar from './AdminNavbar'
import sriEshwarCollegeImage from '../../Images/sriEshwarCollegeImage.png'

function AdminWrapper() {
  return (
    <div className='bg-[#eff2f5]'>
      <AdminNavBar />
      <div class="background-image bg-cover bg-center w-full h-full [@media(max-width:640px)]:h-auto" style={{backgroundImage: `url(${sriEshwarCollegeImage})`}}>
        <div className='p-10 h-[90.7vh] [@media(max-width:640px)]:h-auto bg-fixed bg-[#1976d2] flex items-start' style={{backgroundColor: 'rgba(25, 118, 210, 0.9)'}}>
          <AdminViewTable />
        </div>
      </div>
    </div>
  )
}

export default AdminWrapper
