import React from "react";

function CommentSkeleton() {
  return (
    <div className="animate-pulse w-full  my-4 flex gap-3 group/comment">
      <div className="w-10 h-10 rounded-full shrink-0 bg-skeleton dark:bg-skeletonDark">
        {/*avatar*/}
      </div>
      <div className="w-full">
        {/*username age comment like */}
        <div className="flex items-center gap-2 ">
          <p
            className={`w-1/6 h-4 rounded-full bg-skeleton dark:bg-skeletonDark `}
          >
            {/*owner name */}
          </p>
          <p className="w-1/6 h-4 rounded-full bg-skeleton dark:bg-skeletonDark ">
            {/* age */}
          </p>
        </div>

        <p className="w-full h-4 mt-1 rounded-full bg-skeleton dark:bg-skeletonDark "></p>
        <p className="w-1/2 h-4 mt-1 rounded-full bg-skeleton dark:bg-skeletonDark "></p>
      </div>
    </div>
  );
}

export default CommentSkeleton;
