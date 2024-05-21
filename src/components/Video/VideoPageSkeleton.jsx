import VideoSkeleton from "./VideoSkeleton";

function VideoPageSkeleton() {
  return (
    <div className="animate-pulse flex flex-col lg:flex-row lg:p-2 w-full">
      {/*Left video title description likes channel comments */}
      <div className="lg:w-[65vw] w-full ">
        <div className="aspect-video w-full bg-skeleton dark:bg-skeletonDark rounded-md">
          {/*Video */}
        </div>
        <div className="mx-2 mt-4">
          <h2 className="w-full h-5 bg-skeleton dark:bg-skeletonDark rounded-full"></h2>
          <div className="my-2 flex justify-between items-center flex-wrap">
            <div className="my-2 flex items-center gap-4">
              {/*avatar channel name subscribe btn */}

              <div className="h-10 w-10 bg-skeleton dark:bg-skeletonDark rounded-full">
                {/*avatar */}
              </div>

              <div className="ml-2">
                {/*name subscribers */}
                <p className="bg-skeleton dark:bg-skeletonDark rounded-full h-4 w-44"></p>
                <p className="bg-skeleton dark:bg-skeletonDark rounded-full h-4 w-32 mt-1"></p>
              </div>
              <div>
                {/*subscribe btn*/}
                <div className="bg-skeleton dark:bg-skeletonDark rounded-full w-22 md:w-28 h-10"></div>
              </div>
            </div>
            <div className="my-2 flex items-center gap-4">
              {/*like share save */}
              <div className="bg-skeleton dark:bg-skeletonDark rounded-full w-24 md:w-28 h-8"></div>
              <div className="bg-skeleton dark:bg-skeletonDark rounded-full w-24 md:w-28 h-8"></div>
              <div className="bg-skeleton dark:bg-skeletonDark rounded-full w-24 md:w-28 h-8"></div>
            </div>
          </div>
        </div>
        <div className="mx-2 bg-skeleton dark:bg-skeletonDark rounded-lg  mb-4">
          {/*description*/}
          <div className=" rounded-full h-48"></div>
        </div>
        <div className="mx-2 rounded-md h-28 bg-skeleton dark:bg-skeletonDark">
          {/*comments*/}
        </div>
      </div>

      <div className="mx-auto w-full lg:w-[40vw] xl:w-[35vw]">
        {
          /*right video suggestion*/

          Array.from({ length: 5 })?.map((video) => {
            return <VideoSkeleton wraped={true} />;
          })
        }
      </div>
    </div>
  );
}

export default VideoPageSkeleton