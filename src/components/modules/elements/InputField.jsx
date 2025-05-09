import React from "react"
import { Dropdown } from "primereact/dropdown"

function InputField({
  id,
  label,
  type,
  value,
  name,
  onChange,
  className,
  required = false,
  isFile = false,
  disabled = false,
  options = [],
  optionLabel = "name",
  placeholder = "",
  // ✨ اضافه شد
  itemTemplate = null,
  valueTemplate = null,
}) {
  return (
    <div className="relative flex-1">
      {isFile ? (
        <input
          type="file"
          id={id}
          name={name}
          onChange={onChange}
          className="peer w-full border border-grey/30 rounded-2xl pl-3 pr-10 pt-7 text-sm 
                     focus:outline-none focus:border-lighter focus:ring-1 focus:ring-lighter 
                     hover:border-lighter bg-white transition-all"
        />
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`${
            className ?? ""
          } peer w-full border border-grey/30 rounded-2xl pl-3 pr-3 pt-6 pb-1 text-sm 
             focus:outline-none focus:border-lighter focus:ring-1 focus:ring-lighter 
             hover:border-lighter bg-white transition-all resize-none h-22`}
          required={required}
          disabled={disabled}
        />
      ) : type === "dropdown" ? (
        <Dropdown
          inputId={id}
          value={value}
          onChange={onChange}
          options={options}
          optionLabel={optionLabel}
          placeholder={placeholder}
          className={`custom-dropdown w-full rounded-2xl text-sm ${
            className ?? ""
          }`}
          disabled={disabled}
        />
      ) : type === "searchableDropdown" ? ( // ✨ حالت جدید
        <Dropdown
          inputId={id}
          value={value}
          onChange={onChange}
          options={options}
          optionLabel={optionLabel}
          placeholder={placeholder}
          filter
          itemTemplate={itemTemplate}
          valueTemplate={valueTemplate}
          className={`custom-dropdown w-full rounded-2xl text-sm ${
            className ?? ""
          }`}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`${
            className ?? ""
          } peer w-full border border-grey/30 rounded-2xl pl-3 pr-10 pt-6 pb-1 text-sm 
             focus:outline-none focus:border-lighter focus:ring-1 focus:ring-lighter 
             hover:border-lighter bg-white transition-all`}
          required={required}
          disabled={disabled}
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-3 top-[0.9px] text-gray-500 text-sm transition-all duration-300 
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                   peer-placeholder-shown:text-gray-400
                   peer-focus:top-[-0.5rem] peer-focus:text-sm peer-focus:text-lighter bg-white px-1 pointer-events-none"
      >
        {label}
      </label>
    </div>
  )
}

export default InputField
