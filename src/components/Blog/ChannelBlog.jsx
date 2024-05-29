import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard"
import Loader from "../Loader";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setChannelTweets } from "../../store/tweetSlice";
import { getUserTweets } from "../../services/tweet.service";
import { toast } from "react-toastify";

function ChannelBlog() {
  const location = useLocation();
  const userId = location?.state?.userId;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const channelTweets = useSelector((state) => state.tweet.channelTweets);

  useEffect(() => {
    console.log(userId);

    setLoading(true);
    getUserTweets(userId)
      .then((res) => {
        dispatch(setChannelTweets(res));
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      });
  }, [userId]);

  if (loading) return <Loader />;
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="p-4 w-full md:w-3/4 lg:w-1/2 ">
        <div className=" divide-y divide-gray-200 dark:divide-gray-800">
          {channelTweets.map((tweet) => (
            <BlogCard tweet={tweet} key={tweet._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelBlog;
