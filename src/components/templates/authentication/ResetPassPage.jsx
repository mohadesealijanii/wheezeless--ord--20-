import React, { useState } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"
import InputField from "../../modules/elements/InputField"
import {
  forgotPassword,
  resetPass,
} from "../../../utils/services/authentication"
import ButtonLoading from "../../modules/elements/ButtonLoading"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ResetPassPage() {
  const [recover, setRecover] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    userName: "",
    newPassword: "",
    otp: "",
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = async (e) => {
    e.preventDefault()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(data.userName)) {
      toast.error("Please enter a valid email address!")
      return
    }
    try {
      setLoading(true)
      const res = await forgotPassword({ userName: data.userName })
      if (res.isSuccess === true) {
        setRecover(true)
      } else if (res.isSuccess === false) {
        toast.error(res.message)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  // console.log(window.BASE_URL)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(data.userName)) {
      toast.error("Please enter a valid email address!")
      return
    }

    if (!data.otp || !data.newPassword) {
      toast.error("Please fill the form completely!")
    }
    try {
      setLoading(true)
      const res = await resetPass(data)
      if (res.isSuccess === true) {
        navigate("/signin")
      } else {
        toast.error(res.message)
      }
      console.log(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
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
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="hidden absolute lg:flex md:flex min-h-100 bg-dark shadow-2xl rounded-xl w-300 lg:max-h-100 h-1/2"
        variants={darkBackgroundVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 overflow-hidden relative z-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="flex w-[200%] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] mb-4"
          style={{ marginLeft: recover ? "-100%" : "0%" }}
        >
          <h1 className="text-peach w-1/2 text-3xl font-semibold text-center">
            Reset Form
          </h1>
          <h1 className="text-peach w-1/2 text-3xl font-semibold text-center">
            Recovery Form
          </h1>
        </div>

        <div className="relative flex mt-4 mb-8 border border-gray-300 rounded-2xl overflow-hidden h-12">
          <button
            onClick={() => setRecover(false)}
            className={clsx(
              "w-1/2 z-10 text-lg font-medium transition-colors",
              recover ? "text-dark" : "text-white"
            )}
          >
            Enter Email
          </button>
          <button
            className={clsx(
              "w-1/2 z-10 text-lg font-medium transition-colors",
              recover ? "text-white" : "text-dark"
            )}
          >
            Change Password
          </button>

          <div
            className={clsx(
              "absolute top-0 h-full w-1/2 rounded-2xl bg-dark transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
              recover ? "left-1/2" : "left-0"
            )}
          ></div>
        </div>

        <div className="relative min-h-[320px]">
          <div
            className="flex w-[200%] transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
            style={{ marginLeft: recover ? "-100%" : "0%" }}
          >
            {/* Enter Email Form */}
            <form className="w-1/2 px-8" noValidate>
              <p className="text-center text-md mt-4 mb-6">
                Please Enter Your Email To Recover Your Account!
              </p>
              <div className="mb-14">
                <InputField
                  type="email"
                  name="userName"
                  onChange={handleInputChange}
                  label="Email"
                />
              </div>
              <button
                onClick={handleNext}
                type="submit"
                className="relative w-full h-12 mt-5 cursor-pointer text-white text-lg font-medium rounded-2xl overflow-hidden group hover:shadow-md"
              >
                <span className="absolute group inset-0 w-[300%] -left-full  bg-peach group-hover:bg-peach-hover rounded-2xl transition-all duration-300 group-hover:left-0"></span>
                <span className="relative group">
                  {loading ? <ButtonLoading /> : "Next"}
                </span>
              </button>
            </form>

            <form className="w-1/2 px-8" noValidate>
              <div className="mt-5">
                <InputField
                  type="email"
                  name="userName"
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  label="Email"
                />
              </div>
              <div className="mt-5">
                <InputField
                  type="number"
                  onChange={handleInputChange}
                  name="otp"
                  label="OTP"
                />
              </div>
              <div className="mt-5">
                <InputField
                  type="password"
                  onChange={handleInputChange}
                  name="newPassword"
                  label="New Password"
                />
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="relative w-full h-12 mt-5 cursor-pointer text-white text-lg font-medium rounded-2xl overflow-hidden group hover:shadow-md"
              >
                <span className="absolute inset-0 w-[300%] -left-full bg-peach group-hover:bg-peach-hover rounded-2xl transition-all duration-300 group-hover:left-0"></span>
                <span className="relative z-10 group">
                  {loading ? <ButtonLoading /> : "Submit"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </motion.div>
      <Toaster />
    </div>
  )
}
