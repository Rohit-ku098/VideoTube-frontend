import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faListUl
} from '@fortawesome/free-solid-svg-icons'
import Dropdown from '../Dropdown';
import { formatViews } from '../../utils/formatViews'
import { getAge } from '../../utils/getAge'
import { formatVideoDuration } from '../../utils/formatVideoDuration';

function VideoCard({video, wraped = false}) {
  const dropdownRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState(null)
  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)
  useEffect(() => {
    setDate(getAge(video?.createdAt));
    setViews(formatViews(video?.views));
    setDuration(formatVideoDuration(video?.duration));
  }, [video])

  useEffect(() => {
    const handleCloseDropdown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleCloseDropdown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
    };
  }, [])

  return (
    <div
      className={`p-2 cursor-pointer w-full  ${
        wraped ? " w-full" : "max-w-96 "
      }  group/video`}
    >
      <div className={`flex ${wraped ? "flex-row " : "flex-col"}`}>
        <Link to={`/video/${video?._id}`}>
          <div
            className={` ${
              wraped ? "w-52" : "max-h-56 w-full"
            }  aspect-video relative flex justify-center items-center bg-black rounded-md`}
          >
            {/* Thumbnail */}
            <img
              src={video?.thumbnail || "/default-thumbnail.png"}
              alt=""
              className="max-w-full  max-h-full rounded-md"
            />
            <p className="m-2 p-0.5 text-xs bg-black text-white absolute bottom-0 right-0">
              {duration}
            </p>{" "}
            {/*duration*/}
          </div>
        </Link>

        <div className="w-full flex justify-between mt-2 ">
          <div className="w-8 h-8 rounded-full">
            {!wraped && (
              <Link to={`/c/${video?.owner?._id}`}>
                {/* channel avatar */}
                <img
                  src={video?.owner?.avatar || "/avatar.png"}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            )}
          </div>
          <div
            className={`pl-3 ${wraped ? "w-full" : "w-[90%] "} flex flex-col `}
          >
            <p className="w-full text-md font-bold line-clamp-2">
              {video?.title || "This is title"} {/*title*/}
            </p>
            <p className="text-sm text-slate-500">
              {video?.owner?.fullName || "channel"} {/* channel name */}
            </p>
            <div className="flex gap-1 text-sm text-slate-500">
              <p>{views || 0} views</p> {/*views */}
              <span>•</span>
              <p>{date} ago</p> {/*date */}
            </div>
          </div>
          <div ref={dropdownRef} className="">
            {/* 3dot */}
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={`m-2 cursor-pointer ${
                isDropdownOpen ? "visible" : "invisible"
              } group-hover/video:visible`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <Dropdown
                options={[
                  {
                    title: "add to playlist",
                    path: "/playlist",
                    icon: faListUl,
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard
