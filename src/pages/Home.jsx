import React, {useState, useEffect} from 'react'
import VideoContainer from '../components/Video/VideoContainer'
import { useSelector, useDispatch } from 'react-redux';

function Home() {
  const dispatch = useDispatch()


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
      {/* <Test/> */}
      {/* <Appearance/> */}
    </>
  );
}

export default Home
