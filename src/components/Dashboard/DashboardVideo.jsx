import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faMessage,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-regular-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteVideo, togglePublishStatus } from "../../services/video.service";
import { getDashboardVideos } from "../../services/dashboard.service";
import Modal from "../Modal";
import { toast } from "react-toastify";
import Loader from "../Loader";
import VideoCard from "../Video/VideoCard";
import EditVideo from "../Video/EditVideo";

function DashboardVideos() {
  const [videos, setVideos] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openVideoStatusModal, setOpenVideoStatusModal] = useState(false);
  const [openEditVideo, setOpenEditVideo] = useState(false);
  const [deleteVideoId, setDeleteVideoId] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getDashboardVideos()
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error, {
          position: "bottom-left",
        });       
      }).finally(() => {
        setLoader(false);
      })
  },[]);

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
        setLoader(false)
        toast.error(error.message || "Something went wrong", {
          position: "bottom-left",
        });
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
        setLoader(false);
        toast.error(error.message || "Something went wrong",{
            position: "bottom-left",
        } )
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
                  icon: faEdit,
                  title: "Edit",
                  path: `/video/edit`,
                  state: { video: video },
                  onClick: () => setOpenEditVideo(true),
                },
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

export default DashboardVideos;
