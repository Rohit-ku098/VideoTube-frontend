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
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import { deleteTweet, updateTweet } from "../../services/tweet.service";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../Input";
import LikeBtn from "../LikeBtn";
import { deleteTweet as deleteTweetPost } from "../../store/tweetSlice";
import BlogEditor from "./BlogEditor";
import { updateTweet as updateTweetPost } from "../../store/tweetSlice";

const TweetCard = ({ tweet }) => {
  const dispatch = useDispatch();
  const [age, setAge] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.user);


  const {
    handleSubmit,
    setValue,
    control
  } = useForm()

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
    setAge(getAge(tweet?.createdAt));
    setIsEdited(tweet?.updatedAt !== tweet?.createdAt);
  }, [tweet.updatedAt]);

  const handleDeleteConfirmationPopup = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleDeleteTweet = () => {
    deleteTweet(tweet?._id)
      .then(() => {
        setIsDeleteOpen(false);
        dispatch(deleteTweetPost(tweet?._id));
        toast.error ("Blog deleted successfully", {
          position: 'bottom-left',          
        });
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      });
  };

  const handleOpenEditModal = () => {
    setIsDropdownOpen(false)
    setIsEditOpen(true);
  };
  const handleEditTweet = (data) => {
    updateTweet(tweet?._id, data)
    .then(updatedTweet => {
      dispatch(updateTweetPost(updatedTweet))
      setIsEditOpen(false)
    })
    .catch(error => {
      toast.error(error, {
        position: 'bottom-left',
      })
    })
  };

    return (
      <div className="w-full py-4 flex flex-col gap-3 group/comment">
        <div className="w-full flex shrink-0 gap-3">
          <Link to={`/channel/${tweet?.owner?.userName}`}>
            <div className="w-10 h-10 rounded-full border">
              {/*avatar*/}
              <img
                src={tweet?.owner?.avatar || "/avatar.png"}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
          </Link>
          <div className="">
            {/*username age comment like */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <p className={`font-bold text-md `}>
                  {/*username */}
                  {tweet?.owner?.fullName}
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
              <p className={` text-sm  `}>
                {/*owner name */}
                &#64;{tweet?.owner?.userName}
              </p>
            </div>
          </div>
          {isEditOpen && (
            <form onSubmit={handleSubmit(handleEditTweet)}>
              <BlogEditor
                title="Edit Blog"
                control={control}
                setOpen={setIsEditOpen}
                defaultValue={tweet?.content}
                key={tweet?._id}
              />
            </form>
          )}
          <div
            className={`ml-auto cursor-pointer p-3 ${
              isDropdownOpen ? "visible" : "invisible"
            } group-hover/comment:visible`}
            ref={dropdownRef}
          >
            {/* 3 dots */}
            <button
              className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex justify-center items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>

            {isDropdownOpen && (
              <Dropdown
                options={
                  user?._id === tweet?.owner?._id
                    ? [
                        {
                          title: "Edit",
                          icon: faEdit,
                          onClick: handleOpenEditModal,
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
                title="Delete Blog"
                cancelBtn={"Cancel"}
                confirmBtn={"Delete"}
                onCancel={handleDeleteConfirmationPopup}
                onConfirm={handleDeleteTweet}
              >
                <p>Are you sure to delete? </p>
              </Modal>
            )}
          </div>
        </div>
        <div className="w-full p-1">
          <div className="font-sans whitespace-pre-wrap">{tweet.content}</div>
          {/* <img src="/default-thumbnail.png" alt="" /> */}
        </div>
        <div className="w-full px-2">
          {/* like comment share */}
          <LikeBtn likeTo={"tweet"} ContentId={tweet?._id} type="regular" />
        </div>
      </div>
    );
  
};

export default TweetCard;
