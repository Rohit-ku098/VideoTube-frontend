import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
function VideoPlayer({src}) {
   
  return (
    <div className="aspect-video ">
      <video controls autoPlay={true}  src={src} className="w-full h-full lg:rounded-md bg-black"></video>
    </div>
  );
}

export default VideoPlayer
