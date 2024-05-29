import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { api } from "../services/conf";
import Loader from "../components/Loader";
import useErrorMessage from "../hooks/useErrorMessage";
function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      setError('')
      const formData = new FormData()
      formData.append('avatar', data.avatar[0])
      formData.append('coverImage', data.coverImage[0])
      formData.append('fullName', data.fullName)
      formData.append('userName', data.userName)
      formData.append('email', data.email)
      formData.append('password', data.password)
      const res = await api.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.status === 201) {
        console.log(res)
        navigate('/login')
        reset()
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data?.message)
    }
  }

  function validatePassword(password) {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (
      passwordPattern.test(password) ||
      "Password must be at least 8 characters long and contain at least one letter, one number, and one special character"
    );
  }

  return (
    <section>
      <div className="flex items-center justify-center  px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="bg-white dark:bg-bgDarkSecondary p-5 w-full max-w-sm md:w-full md:max-w-md xl:p-4 2xl:p-6 xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-md border-2 dark:border-gray-800 shadow-sm rounded-lg">
          <div className="mb-2 flex justify-center">
            <Logo height="64px" width="64px" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight ">
            Signup to create account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to={"/login"}
              title="login"
              className="font-semibold  transition-all duration-200 hover:underline"
            >
              Login
            </Link>
          </p>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {error && <div className="text-red-500">{error}</div>}
              <Input
                label={"Full name"}
                type="text"
                placeholder="Full name"
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "Full name is required",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}

              <Input
                label={"Username"}
                type="text"
                placeholder="username"
                {...register("userName", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  validate: {
                    matchPattern: (value) =>
                      /^[a-zA-Z0-9_-]{3,16}$/g.test(value) ||
                      "Username can only contain Alphanumeric characters, _ and - and must be between 3 and 16 characters long",
                  },
                })}
              />
              {errors.userName && (
                <p className="text-red-500">{errors.userName.message}</p>
              )}

              <Input
                type="email"
                label={"Email"}
                placeholder="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  validate: {
                    matchPattern: (value) =>
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <Input
                label={"Password"}
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  validate: validatePassword
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <Input
                label="Avatar"
                type="file"
                placeholder="Avatar"
                {...register("avatar", {
                  required: {
                    value: true,
                    message: "Avatar is required",
                  },
                })}
              />
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
              )}
              <Input
                label="Cover Image"
                type="file"
                placeholder="Cover Image"
                {...register("coverImage")}
              />
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black dark:bg-white px-3.5 py-2.5 font-semibold leading-7 text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80"
                >
                  Create
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

export default Signup;
