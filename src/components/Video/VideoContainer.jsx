import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getAllVideos } from '../../services/video.service'
import { useSelector, useDispatch } from 'react-redux'
import { setVideos } from '../../store/videoSlice'
import { useParams, useSearchParams } from 'react-router-dom'
import Loader from '../Loader'
import VideoSkeleton from './VideoSkeleton'
const VideoContainer = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
     setLoading(true);
     const params = {};
     params.query = searchParams.get("query");
     params.limit = searchParams.get("limit");
     params.page = searchParams.get("page");
     params.userId = searchParams.get("user");
     console.log(params);
     getAllVideos(params).then((video) => {
       setVideos(video);
       setLoading(false);
     });
   }, [searchParams]);

  if(loading) return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5  content-stretch">
      {Array.from({ length: 20 }).map((video, i) => (
        <VideoSkeleton key={i}/>
      ))}
    </div>
  );
  return (
    <div className="grid place-items-center auto-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5  content-stretch">
      {videos?.map((video) => (
        <VideoCard key={video?._id} video={video} />
      ))}
    </div>
    // <div className="flex flex-wrap justify-center items-start gap-4  ">
    //   {videos?.map((video) => (
    //     <VideoCard key={video?._id} video={video} />
    //   ))}
    // </div>
  );
}

export default VideoContainer
