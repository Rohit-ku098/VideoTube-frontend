import React, { useEffect, useRef, useState } from "react";
import { getAge } from "../../utils/getAge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faListUl,
  faEdit,
  faTrash,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown";
import { useSelector } from "react-redux";
import Confirmation from "../Confirmation";
import { deleteComment, updateComment } from "../../services/comment.service";
import { useToast } from "../../context/toastContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../Input";

const Comment = ({ comment, video }) => {
  const [commentContent, setCommentContent] = useState(comment?.content);
  const [age, setAge] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const toast = useToast();

  useEffect(() => {
    const handleCloseDropdown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleCloseDropdown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
    };
  }, []);

  useEffect(() => {
    setAge(getAge(comment?.createdAt));
    setIsEdited(comment?.updatedAt !== comment?.createdAt);
    setCommentContent(comment?.content);
  }, []);

  const handleDeleteConfirmationPopup = () => {
    setIsDeleteOpen(!isDeleteOpen);
    setIsDropdownOpen(false);
  };

  const handleOpenEditComment = () => {
    setIsEditOpen(!isEditOpen);
    setIsDropdownOpen(false);
  };

  const handleDeleteComment = () => {
    deleteComment(comment?._id).then(() => {
      setIsDeleteOpen(false);
      setIsDeleted(true);
      toast.open("Comment deleted successfully");
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      content: commentContent,
    },
  });

  const onSubmit = (data) => {
    updateComment(comment?._id, data).then((res) => {
      console.log("comment updated", res?.content);
      setCommentContent(res?.content);
      setIsEditOpen(false);
      setIsEdited(res?.updatedAt !== res?.createdAt);
    });
  };

  const onCancelEdit = () => {
    setIsEditOpen(false);
    setValue("content", comment?.content);
  };
  return (
    !isDeleted && (
      <div className="w-full p-4 my-2 flex gap-3 group/comment">
        <div>
          {/*avatar*/}
          <img
            src={comment?.owner?.avatar}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="w-full">
          {/*username age comment like */}
          <div className="flex items-center gap-2 ">
            <p
              className={`font-bold text-sm px-1.5 py-0.5 ${
                comment?.owner?.userName === video?.owner?.userName
                  ? "bg-gray-200 dark:bg-gray-700 rounded-xl"
                  : ""
              }`}
            >
              {/*owner name */}
              @&nbsp;{comment?.owner?.userName}
            </p>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              {/* age */}
              {age}
            </p>
            {isEdited && (
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Edited
              </p>
            )}
          </div>
          <div className="w-full">
            {!isEditOpen ? (
              //comment content
              <pre className="font-sans text-wrap">{commentContent}</pre>
            ) : (
              //edit comment
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Input
                  className="w-full border-0 border-b-2 border-b-black dark:border-white p-2 focus:outline-none"
                  placeholder="Add a comment..."
                  autoComplete="off"
                  {...register("content", {
                    max: 200,
                    onChange: (e) => {
                      setCommentContent(e.target.value);
                    },
                  })}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className=" text-sm font-bold cursor-pointer  bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-2xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty}
                    className={` ${
                      isDirty
                        ? "cursor-pointer  bg-black dark:bg-white dark:text-black"
                        : "cursor-not-allowed bg-gray-300 dark:bg-gray-900 dark:text-gray-600"
                    } text-sm font-bold text-white px-3 py-2 rounded-2xl`}
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div
          className={`ml-auto cursor-pointer p-3 ${
            isDropdownOpen ? "visible" : "invisible"
          } group-hover/comment:visible`}
          ref={dropdownRef}
        >
          {/* 3 dots */}
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <Dropdown
              options={
                user?._id === comment?.owner?._id
                  ? [
                      {
                        title: "Edit",
                        icon: faEdit,
                        onClick: handleOpenEditComment,
                      },
                      {
                        title: "Delete",
                        icon: faTrash,
                        onClick: handleDeleteConfirmationPopup,
                      },
                    ]
                  : [
                      {
                        title: "Report",
                        path: `/reportComment/${comment?._id}`,
                        icon: faFlag,
                      },
                    ]
              }
            />
          )}
          {isDeleteOpen && (
            <Confirmation
              title="Delete Comment"
              cancelBtn={"Cancel"}
              confirmBtn={"Delete"}
              onCancel={handleDeleteConfirmationPopup}
              onConfirm={handleDeleteComment}
            >
              <p>Are you sure to delete? </p>
            </Confirmation>
          )}
        </div>
      </div>
    )
  );
};

export default Comment;
