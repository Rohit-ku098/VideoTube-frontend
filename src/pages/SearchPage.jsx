import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../services/video.service";
import { useDispatch, useSelector } from 'react-redux';
import VideoContainer from '../components/Video/VideoContainer';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';

function SearchPage() {
    // const dispatch = useDispatch()
    // const [searchParams, setSearchParams] = useSearchParams();
    // const [searchVideos, setSearchVideos] = useState([])
    // const [loading, setLoading] = useState(false)
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);

    const handleConfirmationPopup = () => {
      setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    };

    const handleFilter = () => {

    }

    // useEffect(() => {
    //   setLoading(true)
    //   const params = {};
    //   params.query = searchParams.get("query");
    //   console.log(params);
    //   getAllVideos(params).then((video) => {
    //     setSearchVideos(video);
    //     setLoading(false)
    //   });
    // }, [searchParams.get("query")]);

  console.log('search page render')
  return (
    <div className=''>
      {/*TODO: Add filter option on search */}
      {/* {loading && <Loader />} */}
      {/* <div className=" flex justify-between items-center gap-2 border-b dark:border-gray-800 p-4 ">
        <ul className="flex items-center gap-2 [&>*]:bg-black dark:[&>*]:bg-white/95 [&>*]:text-white dark:[&>*]:text-black text-sm [&>*]:py-1 [&>*]:px-2 [&>*]:rounded-lg [&>*]:cursor-pointer">
          <li>All</li>
          <li>Watched</li>
          <li>Unwatched</li>
          <li>Subscriptions</li>
        </ul>
        <div
          className="w-fit flex  items-center gap-2 cursor-pointer"
          onClick={() => handleConfirmationPopup()}
        >
          <FontAwesomeIcon icon={faSliders} className="text-xl" />
          <span className="text-lg">Filter</span>
        </div>
      </div> */}
      <VideoContainer />
      {/* {isConfirmationPopupOpen && (
        <Modal
          title="Search filters"
          cancelBtn="Cancel"
          confirmBtn="Apply"
          onCancel={handleConfirmationPopup}
          onConfirm={handleFilter}
        >
          <div className="mx-4 my-4 flex flex-wrap items-start justify-between gap-6">
            <div>
              <h3 className="mb-2 font-bold border-b-2 border-gray-300 text-center">
                Sort By
              </h3>
              <ul className="flex flex-col  gap-2 text-sm">
                <li>View Count</li>
                <li>Upload Date</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-bold border-b-2 border-gray-300 text-center">
                Upload Date
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li>Today</li>
                <li>This Week</li>
                <li>This Month</li>
                <li>This Year</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-bold border-b-2 border-gray-300 text-center">
                Duration
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li>Under 4 minutes</li>
                <li>4-20 minutes</li>
                <li>Over 20 minutes</li>
              </ul>
            </div>
          </div>
        </Modal>
      )} */}
    </div>
  );
}


export default React.memo(SearchPage)
