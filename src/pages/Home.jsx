import React, {useState, useEffect} from 'react'
import VideoContainer from '../components/Video/VideoContainer'
import { useSelector, useDispatch } from 'react-redux';
import { getAllVideos } from '../services/video.service';
import { setVideos } from '../store/videoSlice';
import Loader from '../components/Loader';
import { useToast } from '../context/toastContext';

function Home() {
  const dispatch = useDispatch()
  const toast = useToast()
 const videos = useSelector((state) => state.videos.videos);

 useEffect(() => {
   getAllVideos().then((data) => {
     dispatch(setVideos(data));
   });
 }, [videos]);

  return (
    <>
      {videos?.length === 0 && <Loader/>}
      <VideoContainer videos={videos}/>
    </>
  );
}

export default Home
