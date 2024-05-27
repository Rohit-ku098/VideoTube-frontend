import React, { useEffect, useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import VideoCard from "../components/Video/VideoCard";

import {
  getDashboardData,
  getDashboardVideos,
} from "../services/dashboard.service";
import { formatViews } from "../utils/formatViews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faMessage,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteVideo, togglePublishStatus } from "../services/video.service";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | VideoTube";
    setLoading(true);
    getDashboardData()
      .then((data) => {
        setChannelData(data);
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
      });

    return () => {
      document.title = "VideoTube";
    }
  }, []);

  if(loading) return <Loader />

  return (
    <div>
      <Navbar menubar={false} />
      <main className={`mt-[4.7rem] p-4`}>
        {/* <h1 className="p-4 text-3xl font-bold underline-offset-4 underline">Dashboard</h1> */}
        <section className="flex items-start justify-start gap-4 p-4 mb-10  ">
          {/* avatar and fullName username total subscribers*/}
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full">
            {/* avatar */}
            <img
              src={channelData?.avatar}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="space-y-3">
            {/* fullName */}
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ">
              {channelData?.fullName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <p>&#64;{channelData?.userName}</p>
              <p>{channelData?.subscribersCount} subscribers</p>
            </div>
          </div>
        </section>

        {/* Channel Analytics */}
        <h2 className="p-2 m-2 text-2xl font-bold  border-gray-300 dark:border-gray-400">
          Channel Analytics
        </h2>
        <section className="p-4 my-8 mb-16 flex flex-wrap items-center text-xl lg:text-2xl font-bold justify-center gap-6  rounded-xl">
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-2xl dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{channelData?.videosCount} </p>
            <p className="">videos</p>
          </div>
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-2xl dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{channelData?.tweetsCount}</p>
            <p>Blogs</p>
          </div>
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-2xl dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{channelData?.playlistsCount}</p>
            <p>Playlists</p>
          </div>
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-lg dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{formatViews(channelData?.totalViews)}</p>
            <p className="">Views</p>
          </div>
        </section>

        {/* dashboard content */}
        <section className="md:p-3 lg:p-4">
          <ul className="flex gap-6 text-lg font-medium text-gray-600 dark:text-gray-300 border-b-2 p-2 ">
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive ? "font-bold text-black dark:text-white " : ""
                }
                end
              >
                Videos
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/blogs"}
                state={{ userId: channelData?._id }}
                className={({ isActive }) =>
                  isActive ? "font-bold text-black dark:text-white " : ""
                }
                end
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/playlists"}
                state={{ userId: channelData?._id }}
                className={({ isActive }) =>
                  isActive ? "font-bold text-black dark:text-white " : ""
                }
                end
              >
                Playlists
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export function DashboardVideos() {
  const [videos, setVideos] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openVideoStatusModal, setOpenVideoStatusModal] = useState(false);
  const [deleteVideoId, setDeleteVideoId] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getDashboardVideos()
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  const handleDeleteVideo = (videoId) => {
    setLoader(true);
    deleteVideo(videoId)
      .then((data) => {
        setVideos((prev) => prev.filter((video) => video._id !== videoId));
        setOpenDeleteModal(false);
        setLoader(false);
        toast.error("Video deleted successfully", {
          position: "bottom-left",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleVideoStatus = (videoId, status) => {
    setLoader(true);
    togglePublishStatus(videoId, status)
      .then((data) => {
        setVideos((prev) =>
          prev.map((video) =>
            video._id === videoId ? { ...video, isPublished: status } : video
          )
        );
        setLoader(false);
        setOpenVideoStatusModal(false);
        toast.success(
          `Video ${
            data.isPublished ? "published" : "unpublished"
          } successfully`,
          {
            position: "bottom-left",
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div>
        {videos?.map((video) => (
          <div
            key={video?._id}
            className="bg-gray-200 dark:bg-bgDarkSecondary m-2 p-2 rounded-xl "
          >
            <VideoCard
              video={video}
              wraped={true}
              threeDotsVisible={true}
              optionsToDropdown={[
                {
                  icon: faTrash,
                  title: "Delete",
                  onClick: () => {
                    setOpenDeleteModal(true);
                    setDeleteVideoId(video?._id);
                  },
                },
              ]}
            />
            <div className="flex justify-end gap-2 p-2 text-sm">
              <span className="flex gap-2 items-center border border-gray-500 dark:border-gray-100 py-1 px-3 rounded-full">
                <FontAwesomeIcon icon={faThumbsUp} />
                {video?.likesCount}
              </span>
              <span className="flex gap-2 items-center border border-gray-500 dark:border-gray-100 py-1 px-3 rounded-full">
                {video?.commentsCount}
                <FontAwesomeIcon icon={faMessage} />
              </span>
              <button
                onClick={() => {
                  setOpenVideoStatusModal(video?._id);
                  setVideoStatus({
                    _id: video?._id,
                    isPublished: video?.isPublished,
                  });
                }}
                className="flex gap-2 items-center border border-gray-500 dark:border-gray-100 py-1 px-3 rounded-full"
              >
                {video?.isPublished ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
                {video?.isPublished ? "Public" : "Private"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {openDeleteModal && (
        <Modal
          title="Delete Video"
          cancelBtn={"Cancel"}
          confirmBtn={"Delete"}
          onCancel={() => {
            setOpenDeleteModal(false);
            setDeleteVideoId(null);
          }}
          onConfirm={() => handleDeleteVideo(deleteVideoId)}
        >
          <p>Are you sure you want to delete this video?</p>
        </Modal>
      )}
      {openVideoStatusModal && (
        <Modal
          title={videoStatus?.isPublished ? "unpublish" : "publish"}
          cancelBtn={"Cancel"}
          confirmBtn={videoStatus?.isPublished ? "Unpublish" : "Publish"}
          onCancel={() => {
            setOpenVideoStatusModal(false);
            setVideoStatus(null);
          }}
          onConfirm={() =>
            toggleVideoStatus(videoStatus?._id, !videoStatus?.isPublished)
          }
        >
          <p>
            Are you sure to {videoStatus?.isPublished ? "unpublish" : "publish"}{" "}
            this video?
          </p>
        </Modal>
      )}

      {loader && <Loader />}
    </div>
  );
}

import PlaylistCard from "../components/Playlist/PlaylistCard";
import { getUserPlaylist } from "../services/playlist.service";
import { useLocation } from "react-router-dom";

export function DashboardPlaylist() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  
  const location = useLocation()
  const userId = location?.state?.userId
  console.log("Dashboard playlist")
  useEffect(() => {
    setLoading(true)
    getUserPlaylist(userId).then((data) => {
      setPlaylists(data)
      setLoading(false);
    }).catch((error) => {
      console.log(error)
      setLoading(false);
    })
  },[userId])

  if(loading) return <Loader />
  return (
    <div>
      {playlists?.map((playlist) => (
        <div className="bg-gray-200 dark:bg-bgDarkSecondary m-2 p-2 rounded-xl ">
          <PlaylistCard
            key={playlist?._id}
            playlistId={playlist?._id}
            wraped={true}
            threeDotsVisible={true}
          />
        </div>
      ))}
    </div>
  );
}


export default Dashboard;
