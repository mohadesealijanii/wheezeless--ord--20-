import React, { useEffect, useState } from "react"
import Table from "../../modules/module/Table"
import { deleteCategory, filterCategory } from "../../../utils/services"
import toast from "react-hot-toast"
import { IoIosAddCircleOutline } from "react-icons/io"
import { LuSearch } from "react-icons/lu"
import { RxCross2 } from "react-icons/rx"
import Icons from "../../modules/elements/Icons"
import ToolTip from "../../modules/elements/ToolTip"
import CategoryModal from "../../modules/module/category/CategoryModal"
import nopic from "../../../assets/nopic.png"
import ReusableDeleteModal from "../../modules/module/ReusableDeleteModal"
import InputField from "../../modules/elements/InputField"
function CategoryPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState("")
  const [refreshTrigger, setRefreshTrigger] = useState(false)
  const [editingState, setEditingState] = useState(false)
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    delete: false,
  })
  const [paginator, setPaginator] = useState({
    name: "",
    pagination: {
      pageSize: 10,
      pageNumber: 1,
    },
  })
  const [searchValue, setSearchValue] = useState("")
  const getImageSrc = (linkImage) => {
    const URL = `${window.IMG_URL}`.replace(/\/$/, "")
    if (!linkImage) return nopic
    const cleanPath = linkImage.replace(/\\/g, "/")
    return `${URL}/${cleanPath}`
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await filterCategory(paginator)
        setData(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast.error("An Error Occured!")
        console.log(error)
      }
    }
    fetchData()
  }, [paginator, refreshTrigger])

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const res = await deleteCategory(id)
      if (res.isSuccess === true) {
        setLoading(false)
        setRefreshTrigger((prev) => !prev)
        toast.success("Category deleted successfully!")
        setModal((prev) => ({ ...prev, delete: false }))
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.message)
    }
  }
  const toggleModal = (modalName) => {
    setModal((prev) => ({ ...prev, [modalName]: !prev[modalName] }))
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "controls", label: "Controls" },
  ]

  const categoryRow = (item) => (
    <tr className="border-b border-dark/10 h-15 text-center">
      <td className="">{item.id}</td>
      <td className="w-5">
        <img
          src={getImageSrc(item.linkImage)}
          alt={item.name}
          className="w-16 h-auto p-2 rounded"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = nopic
          }}
        />
      </td>

      <td className="">{item.name}</td>
      <td className="">{item.description}</td>
      <td className="h-15 text-center">
        <div className="flex items-center justify-center gap-3">
          {Icons.Edit({
            tooltipId: `edit-${item.id}`,
            onClick: () => {
              toggleModal("edit")
              setSelectedItem(item)
              setEditingState(true)
            },
          })}
          {Icons.Delete({
            tooltipId: `delete-${item.id}`,
            onClick: () => {
              toggleModal("delete")
              setSelectedItem(item)
            },
          })}
        </div>
      </td>

      <ToolTip id={`edit-${item.id}`} content="Edit Category" />
      <ToolTip id={`delete-${item.id}`} content="Delete Category" />
    </tr>
  )

  const addButton = () => (
    <button
      onClick={() => toggleModal("add")}
      className="flex p-3 pb-1 rounded-2xl text-white bg-lighter hover:bg-light transition-colors duration-300"
    >
      <IoIosAddCircleOutline size={30} className="mr-1 pb-1" />
      <span className="pr-1">Add Category</span>
    </button>
  )

  const searchField = () => (
    <div className="relative w-full">
      <button
        onClick={() => setPaginator((prev) => ({ ...prev, name: searchValue }))}
        className="absolute bg-lighter hover:bg-light cursor-pointer shadow-md w-11 h-10 p-1 right-1 top-[5px] rounded-xl transition-all duration-300 z-1"
      >
        <LuSearch size={35} color="white" />
      </button>
      {searchValue && (
        <RxCross2
          onClick={() => {
            setSearchValue("")
            setPaginator((prev) => ({ ...prev, name: "" }))
          }}
          className="text-peach cursor-pointer w-6 h-6 p-1 absolute right-14 top-3 transition-all z-1"
        />
      )}
      <InputField
        label="Search Categories"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
  return (
    <>
      {modal.edit && (
        <CategoryModal
          setRefreshTrigger={setRefreshTrigger}
          setModal={setModal}
          id={selectedItem.id}
          editingState={editingState}
        />
      )}

      {modal.add && (
        <CategoryModal
          setRefreshTrigger={setRefreshTrigger}
          setModal={setModal}
        />
      )}
      {modal.delete && (
        <ReusableDeleteModal
          setRefreshTrigger={setRefreshTrigger}
          setModal={setModal}
          onConfirm={() => handleDelete(selectedItem.id)}
          loading={loading}
          headerText={`"${selectedItem.name}" category`}
        />
      )}
      <Table
        title="Category List"
        data={data.dataList}
        setData={setData}
        columns={columns}
        totalData={data.resultCount}
        addButton={addButton()}
        searchField={searchField()}
        setPaginator={setPaginator}
        paginator={paginator}
        loading={loading}
        setLoading={setLoading}
        // customHeaderContent={filters}
        renderRow={categoryRow}
      />
    </>
    // <div>d</div>
  )
}

export default CategoryPage
