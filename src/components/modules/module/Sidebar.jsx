import React, { useEffect, useState } from "react"
import { IoChevronForward } from "react-icons/io5"
import { MdOutlineCategory } from "react-icons/md"
import { AiOutlineControl } from "react-icons/ai"
import { TbMathXDivideY2, TbUsers } from "react-icons/tb"
import { PiDevices, PiUserLight } from "react-icons/pi"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineAlternateEmail } from "react-icons/md"
import { GoVersions } from "react-icons/go"
import { NavLink } from "react-router-dom"
import Cookies from "js-cookie"
import { getMyUserByToken } from "../../../utils/services"
import { CgLogOff } from "react-icons/cg"



function Sidebar() {
  const [expanded, setExpanded] = useState(false) 
  const [data, setData] = useState([])

  const adminInfo = async () => {
    const res = await getMyUserByToken()
    setData(res.data)
  }

  useEffect(() => {
    adminInfo()
  }, [])


  const handleLogout = () => {
    Cookies.remove("accessToken")
    window.location.href = "/signin"
  }

  // useEffect(() => {
  //   const path = location.pathname
  //   const newOpenMenus = {}
  //   menuConfig.forEach((menu) => {
  //     newOpenMenus[menu.key] = menu.routes.some((route) =>
  //       path.startsWith(route.path)
  //     )
  //   })
  //   setOpenMenus(newOpenMenus)
  // }, [location.pathname])


return (
  <div
    className={`sm:z-1 mx-3 mt-10 max-h-fit pb-7 ${
      expanded ? "min-w-56 p-3" : "min-w-17 p-1 pl-6"
    } transition-all duration-200 ease-in-out bg-white border-[1px] border-gray shadow-xl rounded-3xl`}
  >
    {/* Toggle button */}
    <button
      onClick={() => setExpanded((prev) => !prev)}
      className="mb-4 flex w-full"
    >
      <IoChevronForward
        size={25}
        className={`text-light mb-1 mt-1 border-[2px] cursor-pointer rounded-full p-1 transition-transform duration-300 ${
          expanded ? "rotate-180  ml-2" : ""
        }`}
      />
    </button>

    {/* User info */}
    {expanded && (
      <div className="flex items-center py-2 rounded-xl mb-5 transition-all duration-300">
        <div className="p-2 rounded-full  bg-blue-100 flex items-center justify-center">
          <PiUserLight size={30} color="#3970d6" />
        </div>
        {expanded && (
          <div className="flex flex-col ml-2">
            <h1 className="text-light text-md">{data.role}</h1>
            <span className="text-dark text-sm text-nowrap">
              {data.firstName} {data.lastName}
            </span>
          </div>
        )}
      </div>
    )}

    {/* Menu list */}
    <ul className="text-grey">
      <li className="pt-3">
        <NavLink
          to="/category"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <MdOutlineCategory size={20} />
          {expanded && "Category"}
        </NavLink>
      </li>

      <li className="mt-5">
        <NavLink
          to="/type"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <AiOutlineControl size={20} />
          {expanded && "Type"}
        </NavLink>
      </li>

      <li className="mt-5">
        <NavLink
          to="/parameter"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <TbMathXDivideY2 size={20} />
          {expanded && "Parameter"}
        </NavLink>
      </li>

      <li className="mt-5">
        <NavLink
          to="/tools"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <PiDevices size={20} />
          {expanded && "Tools"}
        </NavLink>
      </li>

      <li className="mt-5">
        <NavLink
          to="/log"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <TbUsers size={20} />
          {expanded && "Users"}
        </NavLink>
      </li>

      <li className="mt-5">
        <NavLink
          to="/log"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <MdOutlineAlternateEmail size={20} />
          {expanded && "Email"}
        </NavLink>
      </li>

      <li className="mt-5">
        <NavLink
          to="/log"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <IoSettingsOutline size={20} />
          {expanded && "Setting"}
        </NavLink>
      </li>

      <li className="mt-5">
        <NavLink
          to="/log"
          className={({ isActive }) =>
            `flex items-center gap-3 hover:text-peach transition duration-300 ${
              isActive ? "text-peach font-semibold" : ""
            }`
          }
        >
          <GoVersions size={20} />
          {expanded && "Version"}
        </NavLink>
      </li>

      <li className="mt-5">
        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-3 text-peach hover:text-peach-hover transition duration-300 w-full"
        >
          <CgLogOff size={20} />
          {expanded && "Log out"}
        </button>
      </li>
    </ul>
  </div>
)

}

export default Sidebar


// SidebarItem.jsx


