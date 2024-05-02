import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faListUl,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown";
import { getPlaylistById } from "../../services/playlist.service";

function PlaylistCard({ playlistId, wraped = false }) {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [playlist, setPlaylist] = useState({});

  useEffect(() => {
    getPlaylistById(playlistId).then((res) => setPlaylist(res));
  }, [playlistId]);

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
  return (
    <div
      className={`p-2 cursor-pointer w-full  ${
        wraped ? " w-full" : "max-w-96 "
      }  group/video`}
    >
      <div className={`flex ${wraped ? "flex-row " : "flex-col"}`}>
        <Link to={`/playlist/${playlist?._id}`} className="relative">
          <div
            className={` ${
              wraped ? "w-52" : "max-h-56 w-full"
            }  aspect-video relative flex justify-center items-center bg-black dark:bg-[#3d3d4e72] rounded-md shadow-[-4px_-4px]  shadow-gray-500 dark:shadow-gray-700`}
          >
            {/* Thumbnail */}
            <img
              src={
                playlist?.videos?.at(0)?.thumbnail || "/default-thumbnail.png"
              }
              alt=""
              className="max-w-full  max-h-full rounded-md"
            />
            {/* Total videos in playlist */}
            <p className="m-2 p-0.5 text-xs bg-black bg-opacity-50 text-white absolute bottom-0 right-0">
              {playlist?.videos?.length > 1 ? `${playlist?.videos?.length} videos`: `${playlist?.videos?.length} video`}
            </p>{" "}
          </div>
        </Link>

        <div className="w-full flex justify-between mt-2 ">
          <div
            className={`pl-3 ${wraped ? "w-full" : "w-[90%] "} flex flex-col `}
          >
            <p className="w-full text-md font-bold line-clamp-2">
              {playlist?.name || "Playlist"} {/*title*/}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {playlist?.owner?.fullName} {/* channel name */}
            </p>
            <Link to={`/playlist/${playlist?._id}`}>
              <p className="text-gray-500 dark:text-gray-400">
                view full playlist
              </p>
            </Link>
          </div>
          <div
            ref={dropdownRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex justify-center items-center"
          >
            {/* 3dot */}
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={`m-2 cursor-pointer ${
                isDropdownOpen ? "visible" : "invisible"
              } group-hover/video:visible`}
            />
            {isDropdownOpen && (
              <Dropdown
                options={[
                  {
                    title: "Delete",
                    icon: faTrash,
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

export default PlaylistCard;
