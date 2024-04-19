import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getVideoById } from '../../services/video.service'
function VideoPlayer({src}) {
   
  return (
    <div className="aspect-video ">
      <video controls  src={src} className="w-full h-full lg:rounded-md"></video>
    </div>
  );
}

export default VideoPlayer