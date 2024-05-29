import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById, removeVideoFromPlaylist } from "../services/playlist.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faListUl,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../components/Dropdown";
import VideoContainer from "../components/Video/VideoContainer";
import VideoCard from "../components/Video/VideoCard";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import PlaylistPageSkeleton from "../components/Playlist/PlaylistPageSkeleton";
import { toast } from "react-toastify";

function Playlist({ wraped }) {
  const { playlistId } = useParams();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [playlist, setPlaylist] = useState({});
  const [loading, setLoading] = useState(true)
  const {user} = useSelector(state => state.user)

  useEffect(() => {
    setLoading(true)
    getPlaylistById(playlistId)
      .then((res) => {
        setPlaylist(res);
        setLoading(false)
      }).catch((error) =>{
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setLoading(false)
      })
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

  const handleRemoveVideoFromPlaylist = (videoId) => {
    setPlaylist(prev => {
      return {
        ...prev,
        videos: prev.videos.filter(video => video._id !== videoId)
      }
    })
    removeVideoFromPlaylist(videoId, playlistId).then((data) => {

    }).catch((error) => {
      toast.error(error, {
        position: "bottom-left",
      });
    })
  }
  console.log(playlist)
  if(loading) return <PlaylistPageSkeleton/>
  return (
    <div className="w-full p-6 flex justify-center">
      <div className="lg:max-w-[70%] flex justify-start flex-col md:flex-row">
        <div className="min-w-80 border dark:border-gray-800 flex justify-center bg-gray-300 dark:bg-bgDarkSecondary rounded-xl">
          {/* playlist info */}
          <div
            className={`p-2 cursor-pointer w-full  ${
              wraped ? " w-full" : "max-w-96 "
            }  group/video`}
          >
            <div className={`flex ${wraped ? "flex-row " : "flex-col"}`}>
              <div
                className={` ${
                  wraped ? "w-52" : "max-h-56 w-full"
                }  aspect-video relative flex justify-center items-center  rounded-md `}
              >
                {/* Thumbnail */}
                <img
                  src={
                    playlist?.videos?.at(0)?.thumbnail ||
                    "/default-thumbnail.png"
                  }
                  alt=""
                  className="max-w-full  max-h-full rounded-md"
                />
              </div>

              <div className="w-full flex justify-between mt-2 ">
                <div
                  className={`pl-3 ${
                    wraped ? "w-full" : "w-[90%] "
                  } flex flex-col `}
                >
                  <p className="w-full text-2xl font-bold line-clamp-2">
                    {playlist?.name || "Playlist"} {/*title*/}
                  </p>
                  <p className="text-sm text-gray-500">
                    {playlist?.owner?.fullName} {/* channel name */}
                  </p>
                  {/* Total videos in playlist */}
                  <p className="text-sm text-gray-500">
                    {playlist?.videos?.length || 0} videos
                  </p>{" "}
                </div>
              </div>
            </div>
            <div className="p-3 m-2">
              {/* description */}
              <p className="">{playlist?.description}</p>
            </div>
          </div>
        </div>
        <div>
          {/* playlist videos */}
          {playlist?.videos?.map((video) => (
            <VideoCard key={video?._id} video={video} wraped={true} optionsToDropdown= {playlist?.owner?._id === user?._id && [{title: "Remove", icon: faTrash, onClick: () => handleRemoveVideoFromPlaylist(video?._id)}] } />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
