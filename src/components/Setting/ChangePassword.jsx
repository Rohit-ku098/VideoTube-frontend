import React from "react";
import Input from "../Input";
import Modal from "../Modal";
import { changePassword } from "../../services/user.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useErrorMessage from "../../hooks/useErrorMessage";

function ChangePassword({ setOpenModal }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleChangePassword = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Password does not match",
      });
      return;
    }

    changePassword(data)
      .then((res) => {
        toast.success("Password changed successfully", {
          position: "bottom-left",
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      })
      .finally(() => {
        setOpenModal(false);
      });
  };

  function validatePassword(password) {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (
      passwordPattern.test(password) ||
      "Password must be at least 8 characters long and contain at least one letter, one number, and one special character"
    );
  }

  return (
    <Modal
      title="Change Password"
      onCancel={() => setOpenModal(false)}
      onConfirm={() => {}}
    >
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="w-[70vw] md:w-[60vw] lg:w-[50vw]"
      >
        <Input
          label="Old Password"
          placeholder="Enter your old password"
          type="password"
          className="mb-2"
          {...register("oldPassword", { required: true })}
        />
        <Input
          label="New Password"
          placeholder="Enter your new password"
          type="password"
          className="mb-2"
          {...register("newPassword", {
            required: true,
            validate: validatePassword,
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword.message}</p>
        )}
        <Input
          label="Confirm Password"
          placeholder="Confirm your new password"
          type="password"
          className="mb-2"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-xs md:text-sm   p-2 bg-black dark:bg-white text-white dark:text-black rounded-xl"
          >
            Change Password
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ChangePassword;
