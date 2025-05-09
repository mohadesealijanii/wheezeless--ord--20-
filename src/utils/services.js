import Cookies from "js-cookie"

const token = Cookies.get("accessToken")
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
}

const formDataHeaders = {
  Authorization: `Bearer ${token}`,
}

export const getMyUserByToken = async () => {
  const res = await fetch(`${window.BASE_URL}/Register/GetMyUserByToken`, {
    method: "GET",
    headers,
  })
  const response = await res.json()
  return response
}

//category

export const filterCategory = async (data) => {
  const res = await fetch(`${window.BASE_URL}/AdminCategory/Filter`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
  const response = await res.json()
  return response
}

export const createCategory = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Name", data.Name)
  realFormData.append("Id", data.Id)
  realFormData.append("Description", data.Description)
  realFormData.append("Image", data.Image)

  const res = await fetch(`${window.BASE_URL}/AdminCategory/Create`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const updateCategory = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Name", data.Name)
  realFormData.append("Id", data.Id)
  realFormData.append("Description", data.Description)
  realFormData.append("Image", data.Image)
  const res = await fetch(`${window.BASE_URL}/AdminCategory/Update`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const deleteCategory = async (id) => {
  const res = await fetch(`${window.BASE_URL}/AdminCategory/Delete/${id}`, {
    method: "POST",
    headers,
  })
  const response = await res.json()
  return response
}

//type
export const filterType = async (data) => {
  const res = await fetch(`${window.BASE_URL}/AdminType/Filter`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
  const response = await res.json()
  console.log(response)
  return response
}

export const createType = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Id", data.Id)
  realFormData.append("Name", data.Name)
  realFormData.append("Description", data.Description)
  realFormData.append("Image", data.Image)

  const res = await fetch(`${window.BASE_URL}/AdminType/Create`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const updateType = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Name", data.Name)
  realFormData.append("Id", data.Id)
  realFormData.append("Description", data.Description)
  realFormData.append("Image", data.Image)
  const res = await fetch(`${window.BASE_URL}/AdminType/Update`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const deleteType = async (id) => {
  const res = await fetch(`${window.BASE_URL}/AdminType/Delete/${id}`, {
    method: "POST",
    headers,
  })
  const response = await res.json()
  return response
}

//parameter
export const filterParameter = async (data) => {
  const res = await fetch(`${window.BASE_URL}/AdminParameter/Filter`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
  const response = await res.json()
  console.log(response)
  return response
}

export const createParameter = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Id", data.Id)
  realFormData.append("Name", data.Name)
  realFormData.append("Description", data.Description)
  realFormData.append("Format", data.Format)
  realFormData.append("Image", data.Image)

  const res = await fetch(`${window.BASE_URL}/AdminParameter/Create`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const updateParameter = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Name", data.Name)
  realFormData.append("Id", data.Id)
  realFormData.append("Description", data.Description)
  realFormData.append("Format", data.Format)
  realFormData.append("Image", data.Image)
  const res = await fetch(`${window.BASE_URL}/AdminParameter/Update`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const deleteParameter = async (id) => {
  const res = await fetch(`${window.BASE_URL}/AdminParameter/Delete/${id}`, {
    method: "POST",
    headers,
  })
  const response = await res.json()
  return response
}

//tools
export const filterTool = async (data) => {
  const res = await fetch(`${window.BASE_URL}/AdminTools/Filter`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
  const response = await res.json()
  console.log(response)
  return response
}

export const createTool = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Id", data.Id)
  realFormData.append("Name", data.Name)
  realFormData.append("Description", data.Description)
  realFormData.append("TypeId", data.TypeId)
  realFormData.append("CategoryId", data.CategoryId)
  realFormData.append("Image", data.Image)

  const res = await fetch(`${window.BASE_URL}/AdminTools/Create`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const updateTool = async (data) => {
  const realFormData = new FormData()
  realFormData.append("Id", data.Id)
  realFormData.append("Name", data.Name)
  realFormData.append("Description", data.Description)
  realFormData.append("TypeId", data.TypeId)
  realFormData.append("CategoryId", data.CategoryId)
  realFormData.append("Image", data.Image)
  const res = await fetch(`${window.BASE_URL}/AdminTools/Update`, {
    method: "POST",
    headers: formDataHeaders,
    body: realFormData,
  })
  const response = await res.json()
  return response
}

export const deleteTool = async (id) => {
  const res = await fetch(`${window.BASE_URL}/AdminTools/Delete/${id}`, {
    method: "POST",
    headers,
  })
  const response = await res.json()
  return response
}
