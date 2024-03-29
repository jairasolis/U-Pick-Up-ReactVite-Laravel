import React from 'react'
import { Outlet } from 'react-router-dom'

// import components
import AdminNavbar from '../components/navbar/AdminNavbar2'
import AdminLeftBar from '../components/leftBar/AdminLeftBar'

const DashboardLayout = () => {
  return (
    <div className="div">
      <AdminNavbar/>
      <div style={{display:'flex'}}> 
        <AdminLeftBar/>  
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
