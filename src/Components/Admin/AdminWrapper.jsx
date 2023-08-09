import React from 'react'
import AdminViewTable from './AdminViewTable'
import AdminNavBar from './AdminNavbar'

function AdminWrapper() {
  return (
    <div className='bg-[#eff2f5]'>
      <AdminNavBar />
      <div className='p-10 h-[90.7vh] bg-fixed bg-[#1976d2] flex items-start'>
        <AdminViewTable />
      </div>
    </div>
  )
}

export default AdminWrapper
