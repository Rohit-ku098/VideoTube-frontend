import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getAllVideos } from '../../services/video.service'
const VideoContainer = () => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        getAllVideos().then((data) => {
            setVideos(data)
        })
    }, [])
  return (
      <div className="grid place-content-center auto-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 content-stretch">
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
