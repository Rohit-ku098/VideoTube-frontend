import React, { useCallback, useEffect, useState } from 'react'
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
import { Link, useHref, useParams } from 'react-router-dom'
import { getAllVideos, getVideoById } from '../services/video.service'
import VideoCard from '../components/Video/VideoCard'
import {formatViews} from '../utils/formatViews'
import {getAge} from '../utils/getAge'
import CommentContainer from '../components/Comment/CommentContainer'
import { toggleSubscribe, getSubscriptionStatus } from '../services/subscription.service'
import { toggleVideoLike, getVideoLikeInfo } from '../services/like.service'
import { useSelector } from 'react-redux'
import SubscribeBtn from '../components/SubscribeBtn'
import LikeBtn from '../components/LikeBtn'
import VideoSkeleton from '../components/Video/VideoSkeleton'
import VideoPageSkeleton from '../components/Video/VideoPageSkeleton'
import { toast } from 'react-toastify'
import PlaylistModal from '../components/Playlist/PlaylistModal'

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
      const [loading, setLoading] = useState(false)
      const [openPlaylistModal, setOpenPlaylistModal] = useState(false)
      const [isPrivate, setIsPrivate] = useState(false)

      const {user} = useSelector(state => state.user)

     const handleOpenDescription = () => {
       setDescriptionOpen(true);
     };
     const handleCloseDescription = () => {
       setDescriptionOpen(false);
     };

     const handleSubscribe =  async () => {
        setIsSubscribed((prev) => !prev)
        if (!isSubscribed) {
          setTotalSubscribers(totalSubscribers + 1);
        } else {
          setTotalSubscribers(totalSubscribers - 1);
        }

        await toggleSubscribe(video?.owner?._id)
        .then((data) => {
          // setIsSubscribed(data.isSubscribed);
          // console.log(data)
        })
        .catch(err => console.log(err))
      }

      // const handleToggleLike = async () => {
      //   await toggleVideoLike(videoId)

      //   await getVideoLikeInfo(videoId).then((data) => {
      //     setTotalLike(data.totalLike);
      //     setLiked(data.isLiked)
      //     // console.log(data.totalLike)
      //   });

      // }

      const handleShare = async () => {
        const shareData = {
          title: "Video Url",
          url: location.href,
        };
        try {
          await navigator.share(shareData)
        } catch (error) {
          console.log(error)
          alert("error sharing")
        }
      }
     useEffect(() => {
      setLoading(true)
      getVideoById(videoId).then((data) => {
        setVideo(data);
        console.log(data)
        setDate(getAge(data?.createdAt) + " ago");
        setViews(formatViews(data?.views));
        setTotalSubscribers(data?.owner?.subscribers)
        if(user?._id !== data?.owner?._id) {
          getSubscriptionStatus(data?.owner?._id)
            .then((data) => {
              setIsSubscribed(data?.isSubscribed);
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(error)
        setLoading(false);
        if (error === "Video is not published") setIsPrivate(true);
        toast.error(error, {
          position: "bottom-left",
        });
      })

       getAllVideos({}).then((data) => {
         setSuggestedVideo(data.videos);
       }).catch(error => {
          toast.error(error, {
            position: "bottom-left",
          });
       })

       getVideoLikeInfo(videoId).then((data) => {
        setLiked(data.isLiked)
        setTotalLike(data.totalLike)
       }).catch((error) => {
         console.log(error)
       })


     }, [videoId]);

     useEffect(() => {
       if (descriptionOpen) {
          const newDate = new Date(video?.createdAt);
          const formattedDate = newDate.toDateString();
          setDate(formattedDate.split(" ").slice(1).join(" "));
        }
        else {
           setDate(getAge(video?.createdAt) + " ago");
        }
     }, [descriptionOpen])
     
    //  useEffect(() => {
    //   if(video && user){
    //     setLoading(false)
    //   }
    //  }, [video, user])
    
    //  console.log(video)

    
  if(loading) return (
    <VideoPageSkeleton />
  ) 

  if(isPrivate) return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
      <p>This video is private</p>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row lg:p-2 w-full">
      {/*Left video title description likes channel comments */}
      <div className="lg:w-[65vw] w-full">
        <div className="">
          {/*Video */}
          <VideoPlayer src={video?.videoFile} />
        </div>
        <div className="mx-2">
          <h2 className="mt-2 text-xl font-bold">{video?.title}</h2>
          <div className="my-2 flex justify-between items-center flex-wrap">
            <div className="w-full md:w-fit my-2 flex items-center gap-4">
              {/*avatar channel name subscribe btn */}
              <Link to={`/channel/${video?.owner?.userName}`}>
                <div className="h-10 w-10 rounded-full">
                  {/*avatar */}
                  <img
                    src={video?.owner?.avatar}
                    alt=""
                    className="rounded-full h-full w-full"
                  />
                </div>
              </Link>
              <div className='w-full flex gap-2 justify-between'>
                <div className="ml-2">
                  {/*name subscribers */}
                  <p className="font-bold">{video?.owner?.fullName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {totalSubscribers}&nbsp;subscribers
                  </p>
                </div>
                <div className='mr-2 md:mr-0'>
                  {/*subscribe btn*/}
                  {video?.owner?._id !== user?._id && (
                    <SubscribeBtn
                      isSubscribed={isSubscribed}
                      onClick={handleSubscribe}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="my-2 flex items-center gap-4">
              {/*like share save */}
              <LikeBtn likeTo={"video"} ContentId={videoId} type="solid" />
              <button
                onClick={handleShare}
                className=" text-sm w-24 md:w-28  text-center px-4 py-1.5 cursor-pointer text-white bg-[#070707] hover:bg-[#353434]  dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black rounded-2xl "
              >
                {/*share icon*/}
                <FontAwesomeIcon icon={faShare} />
                &nbsp;
                <span className="ml-2 text-md">Share</span>
              </button>
              <button 
                onClick={() => setOpenPlaylistModal(true)}
                className=" text-sm w-24 md:w-28  text-center px-4 py-1.5 cursor-pointer text-white bg-[#070707] hover:bg-[#353434]  dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black rounded-2xl">
                {/*save icon*/}
                <FontAwesomeIcon icon={faListUl} />
                &nbsp;
                <span className="ml-2 text-md">Save</span>
              </button>
            </div>
          </div>
        </div>
        {
          openPlaylistModal && (
            <PlaylistModal setShowModal={setOpenPlaylistModal} videoId={videoId}/>
          )
        }
        <div className="mx-2 p-4 bg-white dark:bg-bgDarkSecondary rounded-lg  mb-4">
          {/*description*/}
          <div className="flex gap-5 items-center font-semibold">
            {/* views and date */}
            <p>{views}&nbsp;views</p>
            <p>{date}</p>
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

      <div className="mx-auto lg:w-[40vw] xl:w-[35vw]">
        {
          /*right video suggestion*/
          suggestedVideo.length > 0
            ? suggestedVideo?.map((video) => {
                return (
                  video._id !== videoId && (
                    <VideoCard wraped={true} video={video} key={video._id} />
                  )
                );
              })
            : Array.from({ length: 5 })?.map((video) => {
                return <VideoSkeleton wraped={true} />;
              })
        }
      </div>
    </div>
  );
}

export default Video
