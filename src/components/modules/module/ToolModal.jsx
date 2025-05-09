import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"
import {
  createTool,
  filterCategory,
  filterTool,
  filterType,
  updateTool,
} from "../../../utils/services"
import ButtonLoading from "../elements/ButtonLoading"
import InputField from "../elements/InputField"

function ToolModal({ setModal, setRefreshTrigger, id, editingState }) {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [types, setTypes] = useState([])

  const handleDropdownChange = (name, e) => {
    setFormData({
      ...formData,
      [name]: e.id,
    })
    // console.log(formData)
    // console.log(name, e.id)
  }

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex items-center">
          <div>{option.name}</div>
        </div>
      )
    }
    return <span>{props.placeholder}</span>
  }

  const countryOptionTemplate = (option) => (
    <div className="flex items-center">
      <div>{option.name}</div>
    </div>
  )

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await filterCategory({})
      // console.log(res)
      setCategories(res.data.dataList)
    }
    const fetchType = async () => {
      const res = await filterType({})
      // console.log(res)
      setTypes(res.data.dataList)
    }
    fetchType()
    fetchCategory()
  }, [])

  useEffect(() => {
    if (editingState) {
      const fetchEditingData = async () => {
        const res = await filterTool({ id })
        const data = res.data.dataList[0]
        setFormData({
          Id: data.id,
          Name: data.name,
          Description: data.description,
          CategoryId: data.categoryId,
          TypeId: data.typeId,
          Image: data.Image || "",
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

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      Image: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.Name) {
      toast.error("Please enter the tool data completely")
      return
    }

    try {
      setLoading(true)

      let res

      if (editingState) {
        console.log(formData)
        res = await updateTool(formData)
        console.log(res)
      } else {
        // console.log(formData)
        res = await createTool(formData)
      }

      setModal((prev) => ({ ...prev, add: false, edit: false })) // اگر حالت edit هم هست ببند
      if (res.isSuccess === true) {
        setRefreshTrigger((prev) => !prev)
        toast.success(
          editingState
            ? "Tool successfully updated!"
            : "Tool successfully added!"
        )
      } else {
        toast.error("Something went wrong!")
      }
    } catch (error) {
      console.error("Tool Submit Error:", error)
      toast.error(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center fixed bg-black/60 inset-0 z-7">
      <div className="relative bg-white p-6 rounded-2xl w-full max-w-md">
        <h1 className="text-xl font-semibold text-center mb-4 text-peach">
          {editingState ? "Update Data" : "Enter Tool Data"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <InputField
                type="number"
                id="Id"
                label="Id"
                value={formData.Id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-1/2">
              <InputField
                id="Name"
                label="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 ">
              <InputField
                // id="Category"
                type="searchableDropdown"
                value={categories.find((e) => e.id === formData.CategoryId)}
                onChange={(e) => handleDropdownChange("CategoryId", e.value)}
                options={categories}
                optionLabel="name"
                placeholder="Category"
                itemTemplate={countryOptionTemplate}
                valueTemplate={selectedCountryTemplate}
              />
            </div>
            <div className="w-1/2">
              <InputField
                // id="Country"
                type="searchableDropdown"
                value={types.find((e) => e.id === formData.TypeId)} // Find the full object by id
                onChange={(e) => handleDropdownChange("TypeId", e.value)}
                options={types}
                optionLabel="name"
                placeholder="Type"
                itemTemplate={countryOptionTemplate}
                valueTemplate={selectedCountryTemplate}
              />
            </div>
          </div>
          <div className="w-full">
            <InputField
              id="image"
              label="Image"
              value={formData.Image ? formData.Image.name : ""}
              onChange={handleImageChange}
              isFile={true}
            />
          </div>
          <div className="w-full">
            <InputField
              type="textarea"
              id="Description"
              label="Description"
              value={formData.Description}
              onChange={handleInputChange}
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

export default ToolModal
