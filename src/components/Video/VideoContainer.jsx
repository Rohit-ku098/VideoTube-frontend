import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getAllVideos } from '../../services/video.service'
import { useSelector, useDispatch } from 'react-redux'
import { setVideos } from '../../store/videoSlice'
import { useParams, useSearchParams } from 'react-router-dom'
import Loader from '../Loader'
import VideoSkeleton from './VideoSkeleton'
import { toast } from 'react-toastify'
function VideoContainer () {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [TotalVideosCount, setTotalVideosCount] = useState(0);
  
   useEffect(() => {
     setLoading(true);
     const params = {};
     params.query = searchParams.get("query");
     params.limit = 12
     params.page = page;
     params.userId = searchParams.get("user");
     console.log(params); 
     getAllVideos(params).then((data) => {
      console.log(data)
       setVideos((prev) => [...prev, ...data.videos]);
       setTotalVideosCount(data?.count);
      }).catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setLoading(false);
     })

   }, [searchParams, page]);

   useEffect(() => {
    setVideos([]);
    setPage(1);
   }, [searchParams.get("query")])

   const handleInfiniteScroll =  () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      if(TotalVideosCount > videos.length) {
        setPage((prev) => prev + 1);
      }
    }
   }

   useEffect(() => {
      window.addEventListener("scroll", handleInfiniteScroll);
      return () => {
        window.removeEventListener("scroll", handleInfiniteScroll);
      };
   })

  return (
    <div className="grid place-items-center sm:place-items-start place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5  content-stretch">
      {videos?.map((video) => (
        <VideoCard key={video?._id} video={video} />
      ))}
      {
        loading &&  (
            Array.from({ length: 20 }).map((video, i) => (
              <VideoSkeleton key={i}/>
            ))
        )
      }
    </div>
    // <div className="flex flex-wrap justify-center items-start gap-4  ">
    //   {videos?.map((video) => (
    //     <VideoCard key={video?._id} video={video} />
    //   ))}
    // </div>
  );
}

export default VideoContainer
