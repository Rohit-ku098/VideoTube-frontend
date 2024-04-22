import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../services/video.service";
import { useDispatch, useSelector } from 'react-redux';
import VideoContainer from '../components/Video/VideoContainer';
import Loader from '../components/Loader';

function SearchPage() {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchVideos, setSearchVideos] = useState([])
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
      setLoading(true)
      const params = {};
      params.query = searchParams.get("query");
      console.log(params);
      getAllVideos(params).then((video) => {
        setSearchVideos(video);
        setLoading(false)
      });
    }, [searchParams.get("query")]);

  
  return  (
    <div>
      {loading && <Loader/> }
      <h1>Search Page</h1>
      <VideoContainer videos={searchVideos}/>
    </div>
  )
}

export default React.memo(SearchPage)
