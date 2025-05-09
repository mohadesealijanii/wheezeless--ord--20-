import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"
import InputField from "../../elements/InputField"
import { Dropdown } from "primereact/dropdown"

import {
  createParameter,
  filterParameter,
  updateParameter,
} from "../../../../utils/services"
import ButtonLoading from "../../elements/ButtonLoading"

function ParameterModal({ setModal, setRefreshTrigger, id, editingState }) {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const formatOptions = ["Boolean", "String", "Number"]

  useEffect(() => {
    if (editingState) {
        const fetchEditingData = async () => {
          console.log(formData)
        const res = await filterParameter({ id })
        const data = res.data.dataList[0]
        setFormData({
          Id: data.id,
          Name: data.name,
          Description: data.description,
          Format: data.format,
        })
      }
      fetchEditingData()
    }
  }, [editingState, id])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handleDropdownChange = (e) => {
    setFormData({
      ...formData,
      Format: e,
    })
    console.log(e)
  }

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      Image: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.Name || !formData.Id) {
      toast.error("Please enter the Parameter data completely")
      return
    }

    try {
      setLoading(true)

      let res

      if (editingState) {
        res = await updateParameter(formData)
      } else {
        res = await createParameter(formData)
      }

      setModal((prev) => ({ ...prev, add: false, edit: false })) // اگر حالت edit هم هست ببند
      if (res.isSuccess === true) {
        setRefreshTrigger((prev) => !prev)
        toast.success(
          editingState
            ? "Parameter successfully updated!"
            : "Parameter successfully added!"
        )
      } else {
        toast.error("Something went wrong!")
      }
    } catch (error) {
      console.error("Parameter Submit Error:", error)
      toast.error(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center fixed bg-black/60 inset-0 z-7">
      <div className="relative bg-white p-6 rounded-2xl w-full max-w-md">
        <h1 className="text-xl font-semibold text-center mb-4 text-peach">
          {editingState ? "Update Data" : "Enter Parameter Data"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <InputField
                id="Name"
                label="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-1/2">
              <InputField
                id="Id"
                label="Id"
                type="number"
                value={formData.Id}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 pt-1">
              <InputField
                id="Image"
                label="Image"
                value={formData.Image ? formData.Image.name : ""}
                onChange={handleImageChange}
                isFile={true}
              />
            </div>
            <div className="w-1/2 card rounded-full mt-1">
              <InputField
                id="Format"
                type="dropdown"
                value={formData.Format ?? ""}
                onChange={(e) => handleDropdownChange(e.target.value)}
                options={formatOptions}
                placeholder="Format"
              />
            </div>
          </div>
          <div className="w-full">
            <InputField
              id="Description"
              label="Description"
              value={formData.Description}
              onChange={handleInputChange}
              type="textarea"
              required
            />
          </div>

          <button className="text-center w-full text-white bg-lighter p-2 h-10 rounded-2xl mt-7 hover:bg-light transition-colors duration-300">
            {loading ? (
              <ButtonLoading />
            ) : (
              <span>{editingState ? "Submit" : "Add"}</span>
            )}
          </button>
        </form>

        <button
          onClick={() =>
            setModal((prev) => ({ ...prev, add: false, edit: false }))
          }
          className="absolute top-2 right-3 text-gray-600 hover:text-peach transition-colors duration-300"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default ParameterModal
