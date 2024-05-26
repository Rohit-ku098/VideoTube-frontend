import React from "react";

function VideoSkeleton({ wraped = false }) {
 
  return (
    <div
      className={`animate-pulse p-2 cursor-pointer w-full  ${
        wraped ? "" : "max-w-96 "
      }  group/video`}
    >
      <div className={`flex ${wraped ? "flex-row items-start " : "flex-col"}`}>
        <div
          className={`w-full bg-skeleton dark:bg-skeletonDark ${
            wraped ? "max-w-52" : "max-h-56"
          }  aspect-video relative flex justify-center items-center rounded-md`}
        ></div>

        <div className="w-full flex justify-between mt-2 ">
          <div className=" rounded-full">
            {!wraped && (
              // channel avatar
              <div className="w-10 h-10 rounded-full  bg-skeleton dark:bg-skeletonDark"></div>
            )}
          </div>
          <div
            className={`pl-3 ${wraped ? "w-full" : "w-[90%] "} flex flex-col `}
          >
            <p
              className={`w-full h-4 rounded-full  bg-skeleton dark:bg-skeletonDark`}
            ></p>
            <p className=" bg-skeleton dark:bg-skeletonDark w-1/2 h-4 rounded-full mt-1"></p>
            <div className="flex gap-1">
              <p className=" bg-skeleton dark:bg-skeletonDark w-1/3 h-4 rounded-full mt-1"></p>
              <p className=" bg-skeleton dark:bg-skeletonDark w-full h-4 rounded-full mt-1"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSkeleton;
