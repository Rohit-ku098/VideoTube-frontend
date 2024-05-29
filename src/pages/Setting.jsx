import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { login } from "../store/userSlice";
import {
  updateAccountDetails,
  updateUserAvatar,
  updateCoverImage,
} from "../services/user.service";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import ChangePassword from "../components/Setting/ChangePassword";
import useErrorMessage from "../hooks/useErrorMessage";

function Setting() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [openEditFullName, setOpenEditFullName] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openUpdateAvatar, setOpenUpdateAvatar] = useState(false);
  const [openUpdateCoverImage, setOpenUpdateCoverImage] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const [fullNameUploading, setFullNameUploading] = useState(false);
  const [emailUploading, setEmailUploading] = useState(false);

  const { handleSubmit, register, setValue, formState: {errors}} = useForm({
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = {};
    if (data?.fullName !== user?.fullName) {
      formData.fullName = data?.fullName;
      setFullNameUploading(true);
    }

    if (data?.email !== user?.email) {
      formData.email = data?.email;
      setEmailUploading(true);
    }

    updateAccountDetails(data)
      .then((user) => {
        dispatch(login(user));
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      })
      .finally(() => {
        setOpenEditEmail(false);
        setOpenEditFullName(false);
        setEmailUploading(false);
        setFullNameUploading(false);
        setValue("email", user?.email);
        setValue("fullName", user?.fullName);
      });
  };

  const handleUpdateUserAvatar = () => {
    if (!avatar) {
      toast.error("Please select an image", {
        position: "bottom-left",
      });
      return;
    }

    setAvatarUploading(true);
    const formData = new FormData();
    formData.append("avatar", avatar);

    updateUserAvatar(formData)
      .then((user) => {
        dispatch(login(user));
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setOpenUpdateAvatar(false);
        setAvatar(null);
        setAvatarUploading(false);
      })
  };

  const handleUpdateUserCoverImage = () => {
    if (!coverImage) {
      toast.error("Please select an image", {
        position: "bottom-left",
      });
      return;
    }

    setCoverImageUploading(true);
    const formData = new FormData();
    formData.append("coverImage", coverImage);

    updateCoverImage(formData)
      .then((user) => {
        dispatch(login(user));
        
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setOpenUpdateCoverImage(false);
        setCoverImage(null);
        setCoverImageUploading(false);
      })
  };

  const isValidImage = (image) => image?.name.match(/\.(jpg|jpeg|png)$/i);
  
  useEffect(() => {
    if(avatar && !isValidImage(avatar)) {
      toast.error("Only images are allowed", {
        position: "bottom-left",
      });
      setAvatar(null);
      setAvatarUploading(false);
      setOpenUpdateAvatar(false)
    }
  }, [avatar])

  useEffect(() => {
    if(coverImage && !isValidImage(coverImage)) {
      toast.error("Only images are allowed", {
        position: "bottom-left",
      });
      setCoverImage(null);
      setCoverImageUploading(false);
      setOpenUpdateCoverImage(false)
    }
  }, [coverImage])



  return (
    <div className="h-full p-6">
      <h1 className="text-2xl font-bold mb-4">Setting</h1>
      <section className="">
        <h2 className="text-xl border-b">Profile</h2>
        <table className="pl-3 md:pl-4 lg:pl-6 w-full  border-separate border-spacing-y-6">
          <tbody>
            {/* Avatar */}
            <tr className="  ">
              <td className="mb-2 w-1/3">Avatar</td>
              <td className="w-20 h-20  ml-10 mb-8 relative">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : user?.avatar}
                  alt=""
                  className="w-20 h-20 rounded-full object-cover object-center"
                />
                {avatarUploading && (
                  <div className="bg-[#1312122a] absolute bottom-0 w-20 h-20 rounded-full flex justify-center items-center">
                    <FadeLoader
                      color="#000"
                      height={10}
                      width={4}
                      margin={-5}
                      cssOverride={{
                        translate: "7px 7px",
                      }}
                    />
                  </div>
                )}
                {openUpdateAvatar ? (
                  <div className="flex gap-1 absolute translate-x-[-20%]">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenUpdateAvatar(false);
                        setAvatar(null);
                      }}
                      className="text-xs  w-16 h-6  bg-black dark:bg-white text-white dark:text-black rounded-xl "
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateUserAvatar}
                      className="text-xs w-16 h-6 bg-black dark:bg-white text-white dark:text-black rounded-xl "
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor={"avatar"}
                    className="cursor-pointer w-20 bg-[#13121273] absolute bottom-0 flex justify-center items-center"
                  >
                    <FontAwesomeIcon icon={faPen} className="text-white" />
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      onInput={(e) => {
                        setOpenUpdateAvatar(true);
                        setAvatar(e.target.files[0])
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </td>
            </tr>

            {/* Username */}
            <tr className="my-2">
              <td>Username</td>
              <td className="flex justify-between">
                <p className=" w-full">{user?.userName}</p>
                {/* <button type="button" className="">
                <FontAwesomeIcon icon={faPen} className="" />
              </button> */}
              </td>
            </tr>

            {/* FullName */}
            <tr className="my-2">
              <td>FullName</td>
              <td>
                {openEditFullName ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-wrap justify-between"
                  >
                    <Input
                      {...register("fullName", {
                        required: true,
                      })}
                    />
                    <div className="flex m-1 gap-2">
                      <button
                        type="submit"
                        className="text-xs md:text-sm w-16 h-6 md:h-8 md:w-20 bg-black dark:bg-white text-white dark:text-black rounded-xl"
                      >
                        {fullNameUploading ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenEditFullName(false);
                          setValue("fullName", user?.fullName);
                        }}
                        className="text-xs md:text-sm w-16 h-6 md:h-8 md:w-20 bg-black dark:bg-white text-white dark:text-black rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between">
                    <p className=" w-full">{user?.fullName}</p>
                    <button
                      type="button"
                      onClick={() => setOpenEditFullName(true)}
                      className=""
                    >
                      <FontAwesomeIcon icon={faPen} className="" />
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* coverImage */}
            <tr className="my-2">
              <td className="mb-1 w-1/3">Cover Image</td>
              <td className=" w-full h-20 max-h-20  mb-8  flex justify-between items-center gap-6 ">
                <img
                  src={
                    coverImage
                      ? URL.createObjectURL(coverImage)
                      : user?.coverImage
                  }
                  alt=""
                  className="w-full h-20  object-center"
                />
                {openUpdateCoverImage ? (
                  <div className="flex items-center m-1 gap-2">
                    <button
                      type="button"
                      onClick={handleUpdateUserCoverImage}
                      className="text-xs md:text-sm w-16 h-6 md:h-8 md:w-20 bg-black dark:bg-white text-white dark:text-black rounded-xl"
                    >
                      {coverImageUploading ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setOpenUpdateCoverImage(false);
                      }}
                      className="text-xs md:text-sm w-16 h-6 md:h-8 md:w-20 bg-black dark:bg-white text-white dark:text-black rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <label htmlFor="coverImage" className=" cursor-pointer">
                    <FontAwesomeIcon icon={faPen} className="dark:text-white" />
                    <input
                      type="file"
                      name="coverImage"
                      id="coverImage"
                      onInput={(e) => {
                        setOpenUpdateCoverImage(true)
                        setCoverImage(e.target.files[0])
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="">
        <h2 className="text-xl border-b">Account</h2>
        <table className="pl-3 md:pl-4 lg:pl-6 w-full  border-separate border-spacing-y-5">
          <tbody>
            {/* Email */}
            <tr className="my-2">
              <td className="mb-1 w-1/3">Email</td>
              <td>
                {openEditEmail ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-wrap justify-between"
                  >
                    <Input
                      type="email"
                      {...register("email", {
                        required: true,
                      })}
                    />
                    <div className="flex m-1 gap-2">
                      <button
                        type="submit"
                        className="text-xs md:text-sm w-16 h-6 md:h-8 md:w-20 bg-black dark:bg-white text-white dark:text-black rounded-xl"
                      >
                        {emailUploading ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setValue("email", user?.email);
                          setOpenEditEmail(false);
                        }}
                        className="text-xs md:text-sm w-16 h-6 md:h-8 md:w-20 bg-black dark:bg-white text-white dark:text-black rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between">
                    <p className=" w-full">{user?.email}</p>
                    <button
                      type="button"
                      onClick={() => setOpenEditEmail(true)}
                      className=""
                    >
                      <FontAwesomeIcon icon={faPen} className="" />
                    </button>
                  </div>
                )}
              </td>
            </tr>

            {/* Password */}
            <tr className="my-2">
              <td>Password</td>
              <td>
                {changePasswordOpen ? (
                  <ChangePassword setOpenModal={setChangePasswordOpen}/>
                ) : (
                  <div className="flex justify-between">
                    <p className=" w-full">********</p>
                    <button
                      type="button"
                      onClick={() => setChangePasswordOpen(true)}
                      className=""
                    >
                      <FontAwesomeIcon icon={faPen} className="" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {/* <h2>Delete Account</h2> */}
      </section>
    </div>
  );
}

export default Setting;
