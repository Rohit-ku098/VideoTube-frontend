import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getUserChannelProfile } from "../services/user.service";
import { useSelector } from "react-redux";
import SubscribeBtn from "../components/SubscribeBtn";
import { toggleSubscribe } from "../services/subscription.service";
import VideoContainer from "../components/Video/VideoContainer";
import { getAllVideos } from "../services/video.service";
import Loader from "../components/Loader";

function Profile() {
  const { userName } = useParams();
  const { user } = useSelector((state) => state.user);
  const [channelData, SetChannelData] = useState({});
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelVideos, setChannelVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoOpen, setVideoOpen] = useState(true);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  const handleSubscribe = async () => {
    setIsSubscribed((prev) => !prev);
    if (!isSubscribed) {
      setTotalSubscribers(totalSubscribers + 1);
    } else {
      setTotalSubscribers(totalSubscribers - 1);
    }

    await toggleSubscribe(channelData?._id)
      .then((data) => {
        // setIsSubscribed(data.isSubscribed);
        // console.log(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    getUserChannelProfile(userName)
      .then((res) => {
        SetChannelData(res);
        setTotalSubscribers(res?.subscriberCount);
        setLoading(false);

        getAllVideos({
          userId: res?._id,
        })
          .then((res) => {
            setChannelVideos(res);
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userName]);

  const handleFeedOpen = (feed) => {
    if (feed === "video") {
      setVideoOpen(true);
      setPlaylistOpen(false);
    } else if (feed === "playlist") {
      setVideoOpen(false);
      setPlaylistOpen(true);
    }
  };

  if (loading) return <Loader />;

  return Object.keys(channelData).length > 0 ? (
    <div className="p-4">
      <section className="w-full h-[16vh] md:h-[24vh] lg:p-2 xl:p-3 rounded-xl overflow-hidden">
        {/* coverImage */}
        <img
          src={channelData?.coverImage}
          alt="coverImage"
          className="w-full h-full rounded-xl object-cover"
        />
      </section>
      <section className="flex items-start justify-start gap-4 p-4 mb-10  ">
        {/* avatar and fullName username total subscribers*/}
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full">
          {/* avatar */}
          <img
            src={channelData?.avatar}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="space-y-3">
          {/* fullName */}
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ">
            {channelData?.fullName}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <p>&#64;&nbsp;{channelData?.userName}</p>
            <p>{totalSubscribers} subscribers</p>
          </div>
          <div>
            {/*subscribe btn*/}
            {channelData?._id !== user?._id && (
              <SubscribeBtn
                isSubscribed={isSubscribed}
                onClick={handleSubscribe}
              />
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="w-full border-b-2 border-black dark:border-white/95 p-2 mb-4 flex items-center justify-start gap-6 font-medium">
          <NavLink
            to={`/channel/${channelData?.userName}`}
            state={{ userId: channelData?._id }}
            end
            className={({ isActive }) => `${isActive ? " font-bold" : ""}  
              cursor-pointer`}
          >
            Home
          </NavLink>
          <NavLink
            to={`/channel/${channelData?.userName}/videos`}
            state={{ userId: channelData?._id }}
            end
            className={({ isActive }) => `${isActive ? " font-bold" : ""}  
              cursor-pointer`}
          >
            Videos
          </NavLink>
          <NavLink
            to={`/channel/${channelData?.userName}/playlist`}
            end
            className={({ isActive }) => `${isActive ? " font-bold" : ""}  
              cursor-pointer`}
          >
            Playlists
          </NavLink>
          <NavLink
            to={`/channel/${channelData?.userName}/community`}
            end
            className={({ isActive }) => `${isActive ? " font-bold" : ""}  
              cursor-pointer`}
          >
            Community
          </NavLink>
        
        </div>
        <Outlet />
        {/*  */}
      </section>
    </div>
  ) : (
    <div className="w-full h-[80vh] min-h-48 flex justify-center items-center">
      <p>No channel exists</p>
    </div>
  );
}

export default Profile;