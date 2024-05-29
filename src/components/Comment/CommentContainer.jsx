import React, { useEffect, useState } from "react";
import { getVideoComments, addComment } from "../../services/comment.service";
import { useForm } from "react-hook-form";
import Comment from "./Comment";
import Input from '../Input'
import { api } from "../../services/conf";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentSkeleton from "./CommentSkeleton";
import CommentContainerSkeleton from "./CommentContainerSkeleton";
import { toast } from "react-toastify";

const CommentContainer = ({ video }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, getValues, formState:{isDirty} } = useForm({
    defaultValues: {
      content: "",
    },});

    const {isLoggedIn} = useSelector(state => state.user)

  useEffect(() => {
    setLoading(true)
    getVideoComments(video?._id).then((comments) => {
      setComments(comments);
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    })
  }, [video?._id]);
  
  const onSubmit = (data) => {
    addComment(video._id, data).then((res) => {
      setComments([res, ...comments]);
      setValue("content", "");
    });
  }

  if(loading) return (
    <CommentContainerSkeleton/>
  )
  
  return (
    <div className="m-2 border dark:border-gray-800 p-2 rounded-lg bg-white dark:bg-bgDarkSecondary">
      <div className=" text-lg font-bold">
        <p>{comments?.length} comments</p>
      </div>
      <div>
        {/* Add comments */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full border-0 border-b-2 border-b-black dark:border-white p-2 focus:outline-none"
            placeholder="Add a comment..."
            autoComplete="off"
            {...register("content", { required: true, max: 100, validate: val => val.trim().length > 0 })}
          />
          {isLoggedIn ? (
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className={` ${
                  isDirty
                    ? "cursor-pointer  bg-black dark:bg-white dark:text-black "
                    : "cursor-not-allowed bg-gray-300 dark:bg-gray-900 dark:text-gray-600"
                } text-sm font-bold text-white px-3 py-2 rounded-2xl`}
              >
                Post
              </button>
            </div>
          ) : (
            <div className="flex justify-end mt-2">
              <Link to={'/login'}>
                <p className="text-sm font-bold bg-black text-white dark:bg-white dark:text-black cursor-pointer px-3 py-2 rounded-2xl">
                  Login to post comment
                </p>
              </Link>
            </div>
          )}
        </form>
      </div>
      <div>
        {comments?.map((comment) => (
          <Comment comment={comment} key={comment?._id} video={video}/>
          // <CommentSkeleton/>
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
