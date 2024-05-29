import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faListUl,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown";
import {
  getPlaylistById,
  deletePlaylist,
} from "../../services/playlist.service";

import { useDispatch, useSelector } from "react-redux";
import { setUserPlaylists } from "../../store/playlistSlice";
import Modal from "../Modal";
import { toast } from 'react-toastify'
import PlaylistCardSkeleton from "./PlaylistCardSkeleton";

function PlaylistCard({ playlistId, wraped = false, threeDotsVisible = false }) {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const userPlaylists = useSelector((state) => state.playlist.userPlaylists);
  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [playlist, setPlaylist] = useState({});

  useEffect(() => {
    setLoading(true);
    getPlaylistById(playlistId).then((res) => {
      setPlaylist(res);
    }).catch((error) => {
      toast.error(error, {
        position: "bottom-left",
      });
    }).finally(() => {
      setLoading(false);
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

  const handleDeletePlaylist = () => {
    deletePlaylist(playlistId).then(() => {
      dispatch(
        setUserPlaylists(
          userPlaylists?.filter((playlist) => playlist._id !== playlistId)
        )
      );
      
      toast.error("Playlist deleted successfully", {
        position: "bottom-left",
      })
      
      setIsDeleted(true);
    }).catch((error) => {
      toast.error(error, {
        position: "bottom-left",
      });
    }).finally(() => {
      setIsDeleteConfirmationOpen(false);
    })
  };

  if (loading) return <PlaylistCardSkeleton wraped={wraped} />;
  if(isDeleted) return null;

  return (
    <div
      className={`p-2 cursor-pointer w-full  ${
        wraped ? " w-full" : "max-w-96 "
      }  group/video`}
    >
      <div className={`flex ${wraped ? "flex-row items-center" : "flex-col"}`}>
        <Link to={`/playlist/${playlist?._id}`} className="relative">
          <div
            className={`w-full ${
              wraped ? "max-w-52" : "max-h-56 w-full"
            }  aspect-video relative flex justify-center items-center bg-black dark:bg-[#3d3d4e72] rounded-md shadow-[-4px_-4px]  shadow-gray-500 dark:shadow-gray-700`}
          >
            {/* Thumbnail */}
            <img
              src={playlist?.videos?.at(0)?.thumbnail}
              alt=""
              className="max-w-full  max-h-full rounded-md"
            />
            {/* Total videos in playlist */}
            {
              <p className="m-2 p-0.5 text-xs bg-black bg-opacity-50 text-white absolute bottom-0 right-0">
                {Object.keys(playlist).length > 0
                  ? playlist?.videos?.length > 1
                    ? `${playlist?.videos?.length} videos`
                    : `${playlist?.videos?.length} video`
                  : "No videos"}
              </p>
            }
          </div>
        </Link>

        <div className="w-full  flex justify-between mt-2 ">
          <div
            className={`pl-3 ${wraped ? "w-full" : "w-[90%] "} flex flex-col `}
          >
            <p className="w-full text-md font-bold line-clamp-2">
              {playlist?.name} {/*title*/}
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
          {user?._id === playlist?.owner?._id && (
            <div
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex justify-center items-center"
            >
              {/* 3dot */}
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className={`m-2 cursor-pointer  ${
                  isDropdownOpen ? "visible" : ""
                } ${
                  threeDotsVisible
                    ? "visible"
                    : "group-hover/video:visible invisible"
                }`}
              />
              {isDropdownOpen && (
                <Dropdown
                  options={[
                    {
                      title: "Delete",
                      icon: faTrash,
                      onClick: () =>
                        setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen),
                    },
                  ]}
                />
              )}

              {isDeleteConfirmationOpen && (
                <Modal
                  title="Delete Playlist"
                  cancelBtn={"Cancel"}
                  confirmBtn={"Delete"}
                  onConfirm={handleDeletePlaylist}
                  onCancel={() =>
                    setIsDeleteConfirmationOpen(!isDeleteConfirmationOpen)
                  }
                >
                  <p>Are you sure you want to delete this playlist?</p>
                </Modal>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaylistCard;
