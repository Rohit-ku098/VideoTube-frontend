import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getAllVideos } from "../../services/video.service";
import {  useLocation, useSearchParams } from "react-router-dom";
import Loader from "../Loader";

const ChannelVideos = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const userId = location?.state?.userId
    
    useEffect(() => {
        setLoading(true);
        const params = {};
        params.userId = userId;
        getAllVideos(params).then((video) => {
            setVideos(video);
            setLoading(false);
        });
    }, [userId]);

  if (loading) return <Loader />;

  return (
    <div className="grid place-content-center auto-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5  content-stretch">
      {videos?.map((video) => (
        <VideoCard key={video?._id} video={video} />
      ))}
    </div>
  );
};

export default ChannelVideos;
