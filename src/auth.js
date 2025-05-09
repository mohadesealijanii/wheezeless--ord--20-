
import Cookies from "js-cookie"

export const isTokenValid = () => {
  const token = Cookies.get("accessToken")
  return !!token 
}
