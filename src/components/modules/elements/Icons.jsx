// components/Icons.jsx
import React from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { TbEdit, TbMathXDivideY2 } from "react-icons/tb"
import { IoIosAddCircleOutline } from "react-icons/io"

const Icons = {
  Delete: ({ onClick, tooltipId }) => (
    <RiDeleteBin6Line
      size={35}
      data-tooltip-id={tooltipId}
      className="cursor-pointer bg-red-600/80 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
      onClick={onClick}
    />
  ),

  Edit: ({ onClick, tooltipId }) => (
    <TbEdit
      size={35}
      data-tooltip-id={tooltipId}
      className="cursor-pointer bg-lighter hover:bg-light text-white p-2 rounded-full transition-colors duration-300"
      onClick={onClick}
    />
  ),

  Add: ({ onClick, tooltipId }) => (
    <IoIosAddCircleOutline
      size={35}
      data-tooltip-id={tooltipId}
      className="cursor-pointer bg-green-600/80 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-300"
      onClick={onClick}
    />
  ),

  Parameter: ({ onClick, tooltipId }) => (
    <TbMathXDivideY2
      size={35}
      data-tooltip-id={tooltipId}
      className="cursor-pointer bg-donut hover:bg-peach text-white p-2 rounded-full transition-colors duration-300"
      onClick={onClick}
    />
  ),
}

export default Icons
