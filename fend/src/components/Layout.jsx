import React from 'react'
import SideBar1 from './SideBar1'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <div className="flex h-screen w-full overflow-hidden">
          <SideBar1 />

          <Outlet/>
      </div>
  )
}

export default Layout