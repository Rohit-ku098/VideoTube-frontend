import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getAllVideos } from "../../services/video.service";
import {  useLocation, useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import VideoSkeleton from "./VideoSkeleton";

const ChannelVideos = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const [TotalVideosCount, setTotalVideosCount] = useState(0)
    const [page, setPage] = useState(1);
    const userId = location?.state?.userId

    useEffect(() => {
        setLoading(true);
        const params = {};
        params.userId = userId;
        params.page = page;
        params.limit = 10
        getAllVideos(params).then((data) => {
            setVideos(prev => [...prev, ...data.videos]);
            setTotalVideosCount(data.count)
            setLoading(false);
        }).catch((err) => console.log(err));
    }, [userId, page]);

 
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (TotalVideosCount > videos.length) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  });

  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5  content-stretch ">
      {videos?.map((video) => (
        <VideoCard key={video?._id} video={video} />
      ))}
      {loading &&
        Array.from({ length: 8 }).map((video, i) => <VideoSkeleton key={i} />)
      }
    </div>
  );
};

export default ChannelVideos;
