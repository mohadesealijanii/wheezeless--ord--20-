

export const getToken = async (data) => {
  try {
    const res = await fetch(`${window.BASE_URL}/Register/Token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const response = res.json()
    return response
  } catch (error) {
    console.log("Fetch error:", error)
  }
}

export const forgotPassword = async (userName) => {
  try {
    const res = await fetch(`${window.BASE_URL}/Register/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userName),
    })
    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const resetPass = async (data) => {
  try {
    const res = await fetch(`${window.BASE_URL}/Register/ResetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}
