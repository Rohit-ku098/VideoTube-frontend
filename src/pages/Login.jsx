import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../services/conf";
import useErrorMessage from "../hooks/useErrorMessage";
import { useSelector, useDispatch } from "react-redux";

import { login } from '../store/userSlice'
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import Input from "../components/Input";
import {toast} from "react-toastify"
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError('')
    console.log('submitting')
    const formData = {};
    data.emailOrusername.includes("@")
      ? (formData.email = data.emailOrusername)
      : (formData.userName = data.emailOrusername);
    formData.password = data.password;

    try {
      const res = await api
        .post("/users/login", formData)
       if(res?.status === 200) {
        dispatch(login(res.data?.data?.user))
        const user = useSelector(state => state.user.user)
        navigate('/')
        reset()
       } 
    } catch (error) {
      setError(error.response?.data?.message)
      toast.error(error, {
        position: "bottom-left",
      })
    
    }
  };

  useEffect(() => {
    if(import.meta.env.VITE_TEST_MODE === 'true') {
        toast.info(
        <p>
          For testing purposes you can use <br/> username: {import.meta.env.VITE_TEST_USERNAME} <br /> password: {import.meta.env.VITE_TEST_PASSWORD}
        </p>,
        {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, [])
  console.log('login render')
  return (
    <section>
      <div className=" flex items-center justify-center  px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="bg-white dark:bg-bgDarkSecondary p-5 w-full max-w-sm md:w-full md:max-w-md xl:p-4 2xl:p-6 xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-md border-2 dark:border-gray-800 shadow-sm rounded-lg">
          <div className="mb-2 flex justify-center">
            <Logo height="64px" width="64px" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight ">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300 ">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              title="signup"
              className="font-semibold  transition-all duration-200 hover:underline"
            >
              Create account
            </Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="space-y-5">
              {error && <div className="text-red-500">{error}</div>}
              <Input
                type="text"
                label="Email or Username"
                placeholder="Email or Username"
                {...register("emailOrusername", {
                  required: {
                    value: true,
                    message: "Email or username is required",
                  },
                })}
              />
              {errors.emailOrusername && (
                <div className="text-red-500">
                  {errors.emailOrusername.message}
                </div>
              )}

              <Input
                type="password"
                label="Password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {/* <Link
                to={"#"}
                title="forget password"
                className="block text-sm text-right text-black dark:text-white hover:underline"
              >
                {" "}
                Forgot password?{" "}
              </Link> */}
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}

              <div>
                <button
                  disabled={isSubmitting ? true : false}
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black dark:bg-white px-3.5 py-2.5 font-semibold leading-7 text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          {isSubmitting && <Loader />}
          <div className="mt-3 space-y-3"></div>
        </div>
      </div>
    </section>
  );
}

export default Login;
