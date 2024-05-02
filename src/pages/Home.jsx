import React, {useState, useEffect} from 'react'
import VideoContainer from '../components/Video/VideoContainer'
import { useSelector, useDispatch } from 'react-redux';
import { getAllVideos } from '../services/video.service';
import { setVideos } from '../store/videoSlice';
import Loader from '../components/Loader';
import { useToast } from '../context/toastContext';
import Appearance from '../components/Appearance';

function Home() {
  const dispatch = useDispatch()
  const toast = useToast()

//  const [videos, setVideos] = useState([])

//  useEffect(() => {
//    getAllVideos().then((data) => {
//      setVideos(data);
//    });
//  }, []);



  console.log('home rendered')
  return (
    <>
      {/* {videos?.length === 0 && <Loader/>} */}
      {/* <VideoContainer videos={videos}/> */}
      <VideoContainer />
      {/* <Appearance/> */}
    </>
  );
}

export default Home
