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
import PlaylistModal from '../Playlist/PlaylistModal';

function VideoCard({
  video,
  wraped = false,
  threeDotsVisible = false,
  optionsToDropdown = [],
}) {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  useEffect(() => {
    setDate(getAge(video?.createdAt));
    setViews(formatViews(video?.views));
    setDuration(formatVideoDuration(video?.duration));
  }, [video]);

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
  }, []);

  const openPlaylistModal = () => {
    setIsPlaylistModalOpen(true);
  };

  return (
    <div
      className={`p-2 cursor-pointer w-full  ${
        wraped ? "" : "max-w-96 "
      }  group/video`}
    >
      <div className={`flex ${wraped ? "flex-row items-start " : "flex-col"}`}>
        <Link to={`/video/${video?._id}`}>
          <div
            className={`w-full ${
              wraped ? "max-w-52" : "max-h-56 w-full"
            }  aspect-video relative flex justify-center items-center bg-black dark:bg-[#3d3d4e72] rounded-md`}
          >
            {/* Thumbnail */}
            <img
              src={video?.thumbnail || "/default-thumbnail.png"}
              alt=""
              className="max-w-full  max-h-full rounded-md"
            />
            <p className="m-2 p-0.5 text-xs bg-opacity-40 bg-black text-white absolute bottom-0 right-0">
              {duration}
            </p>{" "}
            {/*duration*/}
          </div>
        </Link>

        <div className="w-full flex justify-between mt-2 ">
          {!wraped && (
            <div className=" rounded-full">
              <Link to={`/channel/${video?.owner?.userName}`}>
                {/* channel avatar */}
                <img
                  src={video?.owner?.avatar || "/avatar.png"}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </div>
          )}
          <div
            className={`pl-3 ${wraped ? "w-full" : "w-[90%] "} flex flex-col `}
          >
            <p
              className={`w-full text-md font-bold ${
                wraped ? "line-clamp-1" : "line-clamp-2"
              }`}
            >
              {video?.title || video?.createdAt} {/*title*/}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              {video?.owner?.fullName} {/* channel name */}
            </p>
            <div className="flex gap-1 text-sm text-slate-500 dark:text-slate-300">
              <p>{views || 0} views</p> {/*views */}
              <span>•</span>
              <p>{date} ago</p> {/*date */}
            </div>
          </div>
          <div ref={dropdownRef}>
            {/* 3dot */}
            <button
              className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex justify-center items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className={`m-2 cursor-pointer  ${
                  isDropdownOpen ? "visible" : ""
                } ${
                  threeDotsVisible
                    ? "visible"
                    : "group-hover/video:visible invisible"
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
            </button>

            {isDropdownOpen && (
              <Dropdown
                options={
                  optionsToDropdown.length > 0
                    ? optionsToDropdown
                    : [
                        {
                          title: "add to playlist",
                          icon: faListUl,
                          onClick: openPlaylistModal,
                        },
                      ]
                }
              />
            )}
          </div>
        </div>
      </div>
      {isPlaylistModalOpen && (
        <PlaylistModal
          videoId={video?._id}
          setShowModal={setIsPlaylistModalOpen}
        />
      )}
    </div>
  );
}

export default VideoCard
