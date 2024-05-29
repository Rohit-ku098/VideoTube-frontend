import {
  faColonSign,
  faMinus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  clearWatchHistory,
  getUserWatchHistory,
  removeVideoFromWatchHistory,
} from "../services/user.service";
import VideoCard from "../components/Video/VideoCard";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

function WatchHistory() {
  const [historyVideos, setHistoryVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClearHistoryConfirmationOpen, setIsClearHistoryConfirmationOpen] =
    useState(false);
  useEffect(() => {
    setLoading(true);
    getUserWatchHistory()
      .then((history) => {
        setHistoryVideos(history);
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setLoading(false)
      })
  }, []);

  const handleRemoveVideoFromWatchHistory = async (videoId) => {
    try {
      setHistoryVideos(
        historyVideos.filter((video) => video.video._id !== videoId)
      );
      await removeVideoFromWatchHistory(videoId);
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "bottom-left",
      })
    }
  };

  const handleClearWatchHistory = async () => {
    try {
      setLoading(true);
      await clearWatchHistory();
      setHistoryVideos([]);
      setLoading(false);
      toast.error("Watch history cleared successfully", {
        position: "bottom-left",
      });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "bottom-left",
      });
    }
  };

  if (loading) return <Loader />;
  if (historyVideos.length === 0)
    return (
      <div className="w-full h-[75vh] flex flex-grow justify-center items-center">
        <p>You have not watched any video </p>
      </div>
    );

  return (
    <div className=" px-4 relative w-full">
      <div className="w-full p-2 pr-8 lg:pr-28   flex justify-between items-center bg-background dark:bg-backgroundDark z-20 fixed ">
        <h1 className="text-2xl font-bold p-2">Watch History</h1>
        <button
          type="button"
          className="hover:bg-gray-200 hover:dark:bg-gray-700 px-3 py-2 rounded-full text-sm"
          onClick={() => setIsClearHistoryConfirmationOpen(true)}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-1" />
          <span>Clear History</span>
        </button>
      </div>
      {isClearHistoryConfirmationOpen && (
        <Modal
          title="Clear History"
          confirmBtn={"Clear"}
          onCancel={() => setIsClearHistoryConfirmationOpen(false)}
          onConfirm={handleClearWatchHistory}
        >
          <p>Are you sure to clear all watch history ?</p>
        </Modal>
      )}
      <div className="pt-16 flex justify-center">
        <div className=" md:w-3/4">
          {historyVideos.map((history) => (
            <VideoCard
              wraped={true}
              key={history._id}
              video={history.video}
              optionsToDropdown={[
                {
                  title: "Remove",
                  icon: faTimes,
                  onClick: () =>
                    handleRemoveVideoFromWatchHistory(history?.video._id),
                },
              ]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchHistory;
