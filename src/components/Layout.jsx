import React from "react";
import Sidebar from "./modules/module/Sidebar";
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
