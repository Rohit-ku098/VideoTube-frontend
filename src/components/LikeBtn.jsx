import React, { useEffect } from "react";
import {
  getVideoLikeInfo,
  getCommentLikeInfo,
  getTweetLikeInfo,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../services/like.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsOup } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

function LikeBtn({ likeTo, ContentId, type="regular" }) {
  const [liked, setLiked] = React.useState(false);
  const [totalLike, setTotalLike] = React.useState(0);

  const handleToggleLike = async () => {
        try {
          setTotalLike(prev => liked ? prev - 1 : prev + 1)
          setLiked(prev => !prev)   
          if(likeTo === "video") {
              await toggleVideoLike(ContentId)
          }
          if (likeTo === "tweet") {
            await toggleTweetLike(ContentId);
          }
          if(likeTo === "comment") {
              await toggleCommentLike(ContentId)
          }
        } catch (error) {
          toast.error(error, {
            position: "bottom-left",
          });
        }
  };

  useEffect(() => {
    if (likeTo === "video") {
      getVideoLikeInfo(ContentId).then((data) => {
        setTotalLike(data.totalLike);
        setLiked(data.isLiked);
        // console.log(data.totalLike)
      }).catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      })
    }
    if (likeTo === "tweet") {
      getTweetLikeInfo(ContentId).then((data) => {
        setTotalLike(data.totalLike);
        setLiked(data.isLiked);
      }).catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      })
    }
    if(likeTo === "comment") {
        getCommentLikeInfo(ContentId).then((data) => {
          setTotalLike(data.totalLike);
          setLiked(data.isLiked);
        }).catch((error) => {
          toast.error(error, {
            position: "bottom-left",
          });
        })
    }
  }, []);

  const btnSolid = " text-sm w-24 md:w-28 text-center px-4 py-1 cursor-pointer text-white bg-[#070707] hover:bg-[#353434] dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black rounded-2xl"
  const btnRegular =
    " text-lg text-center  py-1.5 cursor-pointer rounded-2xl";

    let btnClass = type === "solid" ? btnSolid : btnRegular
    
  return (
    <button
      className={btnClass}
      onClick={handleToggleLike}
    >
      {/*like icon*/}
      <FontAwesomeIcon icon={liked ? faThumbsUp : faThumbsOup} />
      &nbsp;
      <span className="ml-2 text-base">{totalLike}</span>
    </button>
  );
}

export default LikeBtn;
