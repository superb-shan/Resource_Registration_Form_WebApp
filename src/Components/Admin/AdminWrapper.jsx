import React from 'react'
import AdminViewTable from './AdminViewTable'

function AdminWrapper() {
  return (
    <div className='p-10 h-screen bg-fixed bg-[#1976d2] flex items-start'>
      <AdminViewTable />
    </div>
  )
}

export default AdminWrapper
