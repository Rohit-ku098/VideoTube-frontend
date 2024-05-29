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
import Modal from "../Modal";
import { deleteComment, updateComment } from "../../services/comment.service";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../Input";
import LikeBtn from "../LikeBtn";
import { ToastContainer, toast } from 'react-toastify'


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


  useEffect(() => {
    const handleCloseDropdown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
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
  };

  const handleOpenEditComment = () => {
    setIsEditOpen(!isEditOpen);
    setIsDropdownOpen(false);
  };

  const handleDeleteComment = () => {
    deleteComment(comment?._id).then(() => {
      setIsDeleted(true);
      toast.error("Comment deleted successfully", {
        position: "bottom-left",
      });
    }).catch((error) => {
      toast.error(error, {
        position: "bottom-left",
      });
    }).finally(() => {
      setIsDeleteOpen(false);
    })
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
      setIsEdited(res?.updatedAt !== res?.createdAt);
    }).catch((error) => {
      toast.error(error, {
        position: "bottom-left",
      });
    }).finally(() => {
      setIsEditOpen(false);
    })
  };

  const onCancelEdit = () => {
    setIsEditOpen(false);
    setValue("content", comment?.content);
  };
  return (
    !isDeleted && (
      <div className="w-full my-4 flex gap-3 group/comment">
        <Link to={`/channel/${comment?.owner.userName}`}>
          <div className="w-10 shrink-0">
            {/*avatar*/}
            <img
              src={comment?.owner?.avatar}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>
        </Link>
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
              &#64;{comment?.owner?.userName}
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
              <pre className="font-sans whitespace-pre-wrap">
                {commentContent}
              </pre>
            ) : (
              //edit comment
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Input
                  className="w-full border-0 border-b-2 border-b-black dark:border-white p-2 focus:outline-none"
                  placeholder="Add a comment..."
                  autoComplete="off"
                  {...register("content", {
                    max: 200,
                    validate: val => val.trim().length > 0,
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
          <div className="w-full px-2">
            {/* like comment share */}
            <LikeBtn
              likeTo={"comment"}
              ContentId={comment?._id}
              type="regular"
            />
          </div>
        </div>
        <div
          className={`ml-auto cursor-pointer p-3 ${
            isDropdownOpen ? "visible" : "invisible"
          } group-hover/comment:visible`}
          ref={dropdownRef}
        >
          {/* 3 dots */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>

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
                        icon: faFlag,
                      },
                    ]
              }
            />
          )}
          {isDeleteOpen && (
            <Modal
              title="Delete Comment"
              cancelBtn={"Cancel"}
              confirmBtn={"Delete"}
              onCancel={handleDeleteConfirmationPopup}
              onConfirm={handleDeleteComment}
            >
              <p>Are you sure to delete? </p>
            </Modal>
          )}
        </div>
      </div>
    )
  );
};

export default Comment;
