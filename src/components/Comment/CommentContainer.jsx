import React, { useEffect, useState } from "react";
import { getVideoComments, addComment } from "../../services/comment.service";
import { useForm } from "react-hook-form";
import Comment from "./Comment";
import Input from '../Input'
import { api } from "../../services/conf";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);
    const { register, handleSubmit, setValue, getValues, formState:{isDirty} } = useForm({
    defaultValues: {
      content: "",
    },});

    const {isLoggedIn} = useSelector(state => state.user)

  useEffect(() => {
    getVideoComments(videoId).then((comments) => {
      setComments(comments);
    });
  }, [videoId]);
  console.log(comments);
  
  const onSubmit = (data) => {
    addComment(videoId, data).then((res) => {
      setComments([res, ...comments]);
      setValue("content", "");
    });
  }

  return (
    <div className="m-2 border p-2 rounded-lg bg-white">
      <div className=" text-lg font-bold">
        <p>{comments?.length} comments</p>
      </div>
      <div>
        {/* Add comments */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="w-full border-0 border-b-2 border-b-black p-2 focus:outline-none"
            placeholder="Add a comment..."
            autoComplete="off"
            {...register("content", { required: true, max: 100 })}
          />
          {isLoggedIn ? (
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className={` ${
                  isDirty
                    ? "cursor-pointer  bg-black "
                    : "cursor-not-allowed bg-gray-300"
                } text-sm font-bold text-white px-3 py-2 rounded-2xl`}
              >
                Post
              </button>
            </div>
          ) : (
            <div className="flex justify-end mt-2">
              <Link to={'/login'}>
                <p className="text-sm font-bold bg-black text-white cursor-pointer px-3 py-2 rounded-2xl">
                  Login to post comment
                </p>
              </Link>
            </div>
          )}
        </form>
      </div>
      <div>
        {comments?.map((comment) => (
          <Comment comment={comment} key={comment?._id}/>
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
