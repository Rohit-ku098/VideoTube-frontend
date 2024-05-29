import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blog/BlogCard";
import { createTweet, getAllTweets } from "../services/tweet.service";
import Loader from "../components/Loader";
import BlogEditor from "../components/Blog/BlogEditor";
import { useSelector, useDispatch } from "react-redux";
import { setTweets } from "../store/tweetSlice";
import { useForm } from "react-hook-form";
import { addTweet } from "../store/tweetSlice";
import { toast } from "react-toastify";
function Blog() {
  const dispatch = useDispatch();
  const [openCreateTweet, setOpenCreateTweet] = useState(false);
  const [loading, setLoading] = useState(false);
  const tweets = useSelector((state) => state.tweet.tweets);

  useEffect(() => {
    const params = {};

    setLoading(true);
    getAllTweets(params)
      .then((res) => {
        dispatch(setTweets(res));
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => setLoading(false));
  }, []);


     const {
       handleSubmit,
       setValue,
       control,
     } = useForm({
       defaultValues: {
         content: "",
       },
     });

     const onSubmit = (data) => {
     
         createTweet(data)
           .then((tweet) => {
             console.log(tweet);
             dispatch(addTweet(tweet));
             setValue("content", "");
             setOpenCreateTweet(false)
            })
           .catch((error) => {
             toast.error(error, {
               position: "bottom-left",
             });
           });
       
     };



  if (loading) return <Loader />;
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="p-4 w-full md:w-3/4 lg:w-1/2 ">
        {!openCreateTweet ? (
          <div className="mb-4 ">
            <label
              htmlFor="tweetContent"
              className="w-full block mb-2 font-bold "
            >
              Create Post
            </label>
            <textarea
              readOnly
              id="tweetContent"
              placeholder="Tap to create post"
              onClick={() => setOpenCreateTweet(true)}
              className="flex-grow form-textarea w-full p-2 border border-gray-300 bg-transparent rounded-lg min-h-20  outline-none resize-none cursor-pointer"
            ></textarea>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <BlogEditor
              setOpen={setOpenCreateTweet}
              control={control}
              defaultValue=""
            />
          </form>
        )}
        <div className=" divide-y divide-gray-200 dark:divide-gray-800">
          {tweets.map((tweet) => (
            <BlogCard tweet={tweet} key={tweet._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
