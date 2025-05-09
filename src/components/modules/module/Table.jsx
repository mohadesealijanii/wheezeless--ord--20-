import React, { useEffect, useRef, useState } from "react"
import { PropagateLoader } from "react-spinners"
import toast, { Toaster } from "react-hot-toast"
import { Pagination, Stack } from "@mui/material"
import RowDropdown from "../../../../../book/src/components/modules/RowDropdown"

function Table({
  data,
  columns,
  title,
  paginator,
  setPaginator,
  totalData,
  loading,
  renderRow,
  customHeaderContent,
  addButton,
  searchField,
  helpButton,
  advancedSearchCode,
  // setAdvancedSearchCode,
}) {
  const totPages = Math.ceil(totalData / paginator.pagination.pageSize)
  const thisPage = paginator.pagination.pageNumber
  const [dropdown, setDropdown] = useState(false)
  const [jumpInput, setJumpInput] = useState("")
  const dropdownRef = useRef(null)

  const handlePageChange = (event, value) => {
    setPaginator({
      ...paginator,
      pagination: {
        ...paginator.pagination,
        pageNumber: value,
      },
    })
  }

  const jumpHandler = (e) => {
    const input = e.target.value
    setJumpInput(input)
    let targetPage = +input
    if (!input || targetPage < 1 || targetPage > totPages) {
      toast.error(`Page must be between 1 to ${totPages}`)
      targetPage = 1
    }
    setPaginator({ ...paginator, pageNumber: targetPage })
  }

  const handleRowsChange = (newRows) => {
    setPaginator({
      ...paginator,
      pagination: {
        ...paginator.pagination,
        pageSize: newRows,
      },
    })
    setDropdown(false)
  }

  const dropdownHandler = () => setDropdown((prev) => !prev)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen flex justify-center overflow-y-scroll overflow-x-scroll">
      <div className="w-full pb-10 max-h-fit rounded-b-2xl">
        <div className="flex flex-col h-fit min-h-fit text-slate-700 bg-white mt-7 shadow-md rounded-3xl">
          {/* Header */}
          <div className="flex justify-between mx-4 mt-4 text-slate-700 rounded-none">
            <div className="flex">
              <h1 className="text-2xl mt-2 font-semibold text-nowrap text-peach">
                {title}
              </h1>
            </div>
            <div className="hidden lg:block md:block mx-15 min-w-fit w-full">
              {searchField}
            </div>
            <div className="flex text-nowrap items-center">
              {helpButton}
              {addButton}
            </div>
          </div>

          {customHeaderContent && (
            <div className="mb-5 max-w-full flex">{customHeaderContent}</div>
          )}

          <div className="pt-5 w-full">
            {advancedSearchCode && (
              <table className="w-full table-fixed">
                <thead>
                  {/* {advancedSearchCode && (
                    <tr>
                      <td colSpan={9} className="z-50 shadow-lg">
                        <AdvancedRow
                          searchInputs={searchInputs}
                          setSearchInputs={setSearchInputs}
                          paginator={paginator}
                          setPaginator={setPaginator}
                          setAdvancedSearchCode={setAdvancedSearchCode}
                        />
                      </td>
                    </tr>
                  )} */}
                </thead>
              </table>
            )}
          </div>

          {/* Table Content */}
          <div className="p-0 w-full">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <PropagateLoader size={20} color="#023047" />
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto w-full">
                <table className="w-full">
                  <thead>
                    <tr className="top-0 sticky h-15 bg-slate-100 z-2">
                      {columns.map((col, idx) => (
                        <th key={idx} className="p-2">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="">
                    {data.length > 0 ? (
                      data.map((item) => (
                        <React.Fragment key={item.id}>
                          {renderRow(item)}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length}>
                          <div className="flex flex-col justify-center items-center h-64">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/7486/7486809.png"
                              width="156"
                              height="156"
                              alt="Nothing Found"
                            />
                            <p className="text-lg text-gray-500">
                              Nothing Found!
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* paginator */}
          <div className="text-nowrap bg-ocean/10 bg-op border-[1px] border-blue-950/15 rounded-b-2xl shadow-xl">
            <div className="flex items-center justify-between px-5 py-4">
              {/* Jump to Page Input */}
              <div className="hidden lg:flex items-center gap-2">
                <p className="text-sm text-slate-600">Jump to page:</p>
                <input
                  type="number"
                  value={jumpInput}
                  onChange={jumpHandler}
                  className="w-16 px-2 py-1 focus:outline-0 border-[1px] border-slate-300 rounded-md text-sm"
                  min={1}
                />
              </div>

              <Stack spacing={2}>
                <Pagination
                  count={totPages}
                  page={thisPage}
                  siblingCount={1}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={dropdownHandler}
                  className="text-sm text-slate-600 border px-3 py-1 rounded border-slate-300"
                >
                  Rows: {paginator.pageSize}
                </button>
                {dropdown && (
                  <div className="absolute bottom-0 left-0 z-5">
                    <RowDropdown onSelect={handleRowsChange} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}

export default Table
