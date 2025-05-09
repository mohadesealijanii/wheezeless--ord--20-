import React, { useState } from "react"
import logo from "../../../assets/logo.png"
import { motion } from "framer-motion"
import InputField from "../../modules/elements/InputField"
import { getToken } from "../../../utils/services/authentication"
import toast, { Toaster } from "react-hot-toast"
import ButtonLoading from "../../modules/elements/ButtonLoading"
import { useNavigate } from "react-router-dom"
export default function SigninPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    username: "",
    password: "",
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!data.username || !data.password) {
      toast.error("Please fill the form completely!")
      return
    }
    if (!emailRegex.test(data.username)) {
      toast.error("Please enter a valid email address!")
      return
    }
    try {
      setLoading(true)
      const res = await getToken(data)
      // console.log(res)
      if (res.access_token) {
        const expiresDate = new Date(Date.now() + res.expires_in * 1000)

        document.cookie = `accessToken=${
          res.access_token
        }; expires=${expiresDate.toUTCString()}; path=/; secure; SameSite=Strict`

        toast.success("welcome!")
        navigate("/dashboard")
      } else {
        toast.error("Username or password is incorrect!")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const darkBackgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.8 } },
  }

  return (
    <div className="relative bg-gray h-screen w-screen flex items-center justify-center">
      <motion.div
        variants={darkBackgroundVariants}
        initial="hidden"
        animate="visible"
        className="hidden absolute lg:flex md:flex min-h-100 bg-dark shadow-2xl rounded-xl w-300 lg:max-h-100 h-1/2"
      >
        <div className="relative justify-start z-3 w-140 ml-10 mt-30">
          <span className="text-white text-2xl ">Welcome Back To </span>
          <div className="absolute z-2 mt-3">
            <img src={logo} />
          </div>
          <h1 className="text-lighter text-6xl mt-4 ml-20 text-shadow-white">
            heezeless <span className="text-peach text-7xl -ml-2">!</span>
          </h1>
        </div>
      </motion.div>

      <div className="max-w-900 max-h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:absolute md:absolute bg-white w-120 max-h-150 min-h-110 h-2/3 rounded-2xl shadow-xl max-w-md p-8 overflow-hidden z-2"
        >
          <div className="flex transition-all duration-500">
            <h1 className="text-peach mb-7 w-1/2 text-3xl font-semibold">
              Login Form
            </h1>
          </div>

          <div className="flex w-[200%] transition-all duration-500">
            {/* Login Form */}
            <form className="w-1/2 px-8" onSubmit={submitHandler} noValidate>
              <div className="mt-5">
                <InputField
                  type="email"
                  name="username"
                  value={data.username}
                  onChange={handleInputChange}
                  label="E-mail"
                />
              </div>
              <div className="mt-5">
                <InputField
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  label="Password"
                />
              </div>
              <div className="mt-2 text-right text-sm">
                <a href="/resetPass" className="text-light hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="relative mt-24 w-full h-12 cursor-pointer text-white text-lg font-medium rounded-2xl overflow-hidden group hover:shadow-md"
              >
                <span className="absolute group inset-0 w-[300%] -left-full  bg-peach group-hover:bg-peach-hover rounded-2xl transition-all duration-300 group-hover:left-0"></span>
                <span className="relative group z-10">
                  {loading ? <ButtonLoading /> : "Login"}
                </span>
              </button>
            </form>

            {/* Signup Form */}
            <form className="w-1/2 px-8" onSubmit={(e) => e.preventDefault()}>
              <div className="mt-5">
                <InputField
                  type="email"
                  placeholder="Email Address"
                  required
                  label="Email"
                />
              </div>
              <div className="mt-5">
                <InputField
                  type="password"
                  placeholder="Password"
                  required
                  label="Confirm Password"
                />
              </div>
              <div className="mt-5">
                <InputField
                  type="password"
                  placeholder="Confirm password"
                  required
                  label="Password"
                />
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <Toaster />
    </div>
  )
}
