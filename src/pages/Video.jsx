import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faThumbsUp,
    faShare,
    faListUl,
    faEllipsisVertical,

} from '@fortawesome/free-solid-svg-icons'
import {
  faThumbsUp as faThumbsOup
} from '@fortawesome/free-regular-svg-icons'
import Loader from '../components/Loader'
import VideoPlayer from '../components/Video/VideoPlayer'
import { useParams } from 'react-router-dom'
import { getAllVideos, getVideoById } from '../services/video.service'
import VideoCard from '../components/Video/VideoCard'
import {formatViews} from '../utils/formatViews'
import {getAge} from '../utils/getAge'
import CommentContainer from '../components/Comment/CommentContainer'
import { toggleSubscribe, getSubscriptionStatus } from '../services/subscription.service'
import { toggleVideoLike, getVideoLikeInfo } from '../services/like.service'
import { useSelector } from 'react-redux'

function Video() {
     const { videoId } = useParams();
     console.log(videoId)
     const [video, setVideo] = useState({});
      const [date, setDate] = useState(null);
      const [views, setViews] = useState(null);
      const [descriptionOpen, setDescriptionOpen] = useState(false);
      const [suggestedVideo, setSuggestedVideo] = useState([]);
      const [isSubscribed, setIsSubscribed] = useState(false)
      const [totalSubscribers, setTotalSubscribers] = useState(0)
      const [liked, setLiked] = useState(false)
      const [totalLike, setTotalLike] = useState(0)
      const [loading, setLoading] = useState(true)

      const {user} = useSelector(state => state.user)

     const handleOpenDescription = () => {
       setDescriptionOpen(true);
     };
     const handleCloseDescription = () => {
       setDescriptionOpen(false);
     };

     const handleSubscribe = async () => {
        await toggleSubscribe(video?.owner?._id)
        .then((data) => {
          setIsSubscribed(data.isSubscribed);
          if(data.isSubscribed) {
            setTotalSubscribers(totalSubscribers + 1)
          } else {
            setTotalSubscribers(totalSubscribers - 1)
          }
        })
        .catch(err => console.log(err))
      }

      const handleToggleLike = async () => {
        await toggleVideoLike(videoId)

        await getVideoLikeInfo(videoId).then((data) => {
          setTotalLike(data.totalLike);
          setLiked(data.isLiked)
          // console.log(data.totalLike)
        });

      }

     useEffect(() => {
       getVideoById(videoId).then((data) => {
         setVideo(data);
         setDate(getAge(data.createdAt));
         setViews(formatViews(data.views));
         setTotalSubscribers(data?.owner?.subscribers)
         getSubscriptionStatus(data?.owner?._id).then((data) =>
           setIsSubscribed(data?.isSubscribed)
         );
       });

       getAllVideos({}).then((data) => {
         setSuggestedVideo(data);
       });

       getVideoLikeInfo(videoId).then((data) => {
        setLiked(data.isLiked)
        setTotalLike(data.totalLike)
       })


     }, [videoId]);
     
     useEffect(() => {
      if(video && user){
        setLoading(false)
      }
     }, [video, user])
    
    //  console.log(video)
  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col lg:flex-row lg:p-2">
      {/*Left video title description likes channel comments */}
      <div className="lg:max-w-[65vw] w-full">
        <div>
          {/*Video */}
          <VideoPlayer src={video?.videoFile} />
        </div>
        <div className="mx-2">
          <h2 className="text-xl font-bold">{video?.title}</h2>
          <div className="my-2 flex justify-between items-center flex-wrap">
            <div className="my-2 flex items-center gap-4">
              {/*avatar channel name subscribe btn */}
              <div className="h-10 w-10 rounded-full">
                {/*avatar */}
                <img
                  src={video?.owner?.avatar}
                  alt=""
                  className="rounded-full h-full w-full"
                />
              </div>
              <div className="ml-2">
                {/*name subscribers */}
                <p className="font-bold">{video?.owner?.fullName}</p>
                <p className="text-sm text-gray-600">
                  {totalSubscribers}&nbsp;subscribers
                </p>
              </div>
              <div>
                {/*subscribe btn*/}
                {video?.owner?._id !== user?._id && (
                  <button
                    onClick={handleSubscribe}
                    className={`flex items-center justify-center ${
                      isSubscribed
                        ? "bg-gray-300 text-black"
                        : "bg-black text-white"
                    }  text-sm px-4 py-2 rounded-2xl`}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                )}
              </div>
            </div>
            <div className="my-2 flex items-center gap-4">
              {/*like share save */}
              <button
                className=" text-sm w-24 md:w-28 text-center px-4 py-1.5 cursor-pointer text-white bg-[#070707] hover:bg-[#353434]  rounded-2xl"
                onClick={handleToggleLike}
              >
                {/*like icon*/}
                <FontAwesomeIcon icon={liked ? faThumbsUp : faThumbsOup} />
                &nbsp;
                <span className="ml-2 text-md ">{totalLike}</span>
              </button>
              <button className=" text-sm w-24 md:w-28  text-center px-4 py-1.5 cursor-pointer text-white bg-[#070707] hover:bg-[#353434]  rounded-2xl ">
                {/*share icon*/}
                <FontAwesomeIcon icon={faShare} />
                &nbsp;
                <span className="ml-2 text-md">Share</span>
              </button>
              <button className=" text-sm w-24 md:w-28  text-center px-4 py-1.5 cursor-pointer text-white bg-[#070707] hover:bg-[#353434]  rounded-2xl">
                {/*save icon*/}
                <FontAwesomeIcon icon={faListUl} />
                &nbsp;
                <span className="ml-2 text-md">Save</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mx-2 p-4 bg-[#e9e9e9] rounded-lg  mb-4">
          {/*description*/}
          <div className="flex gap-5 items-center font-semibold">
            {/* views and date */}
            <p>{views}&nbsp;views</p>
            <p>{date}&nbsp;ago</p>
          </div>
          <div>
            <pre
              className={`font-sans ${
                !descriptionOpen && "line-clamp-2"
              } whitespace-pre-wrap`}
              onClick={handleOpenDescription}
            >
              {video?.description}
            </pre>
            <span
              className="cursor-pointer font-semibold text-sm z-10"
              onClick={
                descriptionOpen ? handleCloseDescription : handleOpenDescription
              }
            >
              {descriptionOpen ? "show less" : "show more"}
            </span>
          </div>
        </div>
        <div>
          {/*comments*/}
          <CommentContainer video={video} />
        </div>
      </div>

      <div className="mx-auto">
        {
          /*right video suggestion*/
          suggestedVideo?.map((video) => {
            return (
              video._id !== videoId && (
                <VideoCard wraped={true} video={video} key={video._id} />
              )
            );
          })
        }
      </div>
    </div>
  );
}

export default Video
