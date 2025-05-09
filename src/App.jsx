import "./App.css"
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom"
import { useEffect } from "react"
import Layout from "./components/Layout"
import ResetPassPage from "./components/templates/authentication/ResetPassPage"
import SigninPage from "./components/templates/authentication/SigninPage"
import { isTokenValid } from "./auth"
import React from "react"
import CategoryPage from "./components/templates/pages/CategoryPage"
import DashboardPage from "./components/templates/pages/DashboardPage"
import TypePage from "./components/templates/pages/TypePage"
import ParameterPage from "./components/templates/pages/ParameterPage"
import ToolPage from "./components/templates/pages/ToolPage"

const routeTitles = {
  "/": "Home",
  "/signin": "Sign In",
  "/resetPass": "Reset Password",
  "/dashboard": "Dashboard",
}

function App() {
  const location = useLocation()

  useEffect(() => {
    const title = routeTitles[location.pathname] || "wheezeless"
    document.title = `wheezeless | ${title}`
  }, [location.pathname])

  const Authorized = () => {
    return isTokenValid() ? <Outlet /> : <Navigate to="/signin" />
  }

  const UnAuthorized = () => {
    return isTokenValid() ? <Navigate to="/dashboard" /> : <Outlet />
  }
  return (
    <Routes>
      <Route element={<UnAuthorized />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/resetPass" element={<ResetPassPage />} />
      </Route>

      {/* <Route element={<Authorized />}>
        <Route path="/dashboard/*" element={<Layout />} />
      </Route> */}
      <Route element={<Authorized />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/type" element={<TypePage />} />
          <Route path="/parameter" element={<ParameterPage />} />
          <Route path="/tools" element={<ToolPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  )
}

export default App
