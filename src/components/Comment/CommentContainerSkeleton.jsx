import React from 'react'
import CommentSkeleton from './CommentSkeleton';

function CommentContainerSkeleton() {
  return (
    <div className="animate-pulse m-2 border dark:border-gray-800 p-2 rounded-lg">
      <div className=" text-lg font-bold">
        <p className="w-44 h-6 rounded-full my-1 bg-skeleton dark:bg-skeletonDark"></p>
      </div>
      <div>
        {/* Add comments */}
          <div className="w-full h-8 rounded-full  bg-skeleton dark:bg-skeletonDark"></div>
          <div className="flex justify-end mt-2">
            <button
              className={`w-20 h-8 bg-skeleton dark:bg-skeletonDark rounded-2xl`}
            >
            </button>
          </div>
      </div>
      <div>
        {Array.from({length:5})?.map((comment, i) => (
          <CommentSkeleton key={i}/>
        ))}
      </div>
    </div>
  );
}

export default CommentContainerSkeleton
