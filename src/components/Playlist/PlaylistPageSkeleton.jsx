import React from 'react'
import PlaylistCardSkeleton from './PlaylistCardSkeleton';

function PlaylistPageSkeleton({wraped=false}) {
  return (
    <div className="animate-pulse p-6 flex justify-center">
      <div className=" flex justify-start flex-col md:flex-row">
        <div className="min-w-80 border dark:border-gray-800 flex justify-center bg-gray-300 dark:bg-bgDarkSecondary rounded-xl">
          {/* playlist info */}
          <div
            className={`p-2 cursor-pointer w-full  ${
              wraped ? " w-full" : "max-w-96 "
            }  group/video`}
          >
            <div className={`flex ${wraped ? "flex-row " : "flex-col"}`}>
              <div
                className={`bg-skeleton dark:bg-skeletonDark ${
                  wraped ? "w-52" : "max-h-56 w-full"
                }  aspect-video relative flex justify-center items-center  rounded-md `}
              >
                {/* Thumbnail */}
              </div>

              <div className="w-full flex justify-between mt-2 ">
                <div
                  className={`w-full flex flex-col `}
                >
                  <p className="bg-skeleton dark:bg-skeletonDark w-full h-4 mt-1 rounded-full"></p>
                  <p className="bg-skeleton dark:bg-skeletonDark w-1/4 h-4 mt-1 rounded-full"></p>
                  {/* Total videos in playlist */}
                  <p className="bg-skeleton dark:bg-skeletonDark w-1/3 h-4 mt-1 rounded-full"></p>{" "}
                </div>
              </div>
            </div>
            <div className="p-3 m-2">
              {/* description */}
              <p className="bg-skeleton dark:bg-skeletonDark w-full h-4 mt-1 rounded-full"></p>
              <p className="bg-skeleton dark:bg-skeletonDark w-full h-4 mt-1 rounded-full"></p>
              <p className="bg-skeleton dark:bg-skeletonDark w-full h-4 mt-1 rounded-full"></p>
            </div>
          </div>
        </div>
        <div>
          {/* playlist videos */}
          {Array.from({ length: 4 }).map((video) => (
            <PlaylistCardSkeleton wraped={!wraped} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistPageSkeleton
