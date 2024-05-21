import React from 'react'

function PlaylistCardSkeleton({wraped = false}) {
  return (
    <div
      className={`animate-pulse p-2 cursor-pointer w-full  ${
        wraped ? " w-full" : "max-w-96 "
      }  group/video`}
    >
      <div className={`flex ${wraped ? "flex-row " : "flex-col"}`}>
        <div
          className={` ${
            wraped ? "w-52" : "max-h-56 w-full"
          }  aspect-video relative flex justify-center items-center bg-skeleton dark:bg-skeletonDark rounded-md  `}
        ></div>

        <div className="pl-3 w-full  md:min-w-64 xl:min-w-72 flex justify-between mt-2 ">
          <div
            className={`w-full flex flex-col `}
          >
            <p className="w-full h-4 mt-1 rounded-full bg-skeleton dark:bg-skeletonDark">
              {/*title*/}
            </p>
            <p className="w-1/2 h-4 mt-1 rounded-full bg-skeleton dark:bg-skeletonDark"></p>
            <p className="w-3/4 text-gray-500 h-4 mt-1 rounded-full dark:text-gray-400 bg-skeleton dark:bg-skeletonDark"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCardSkeleton
