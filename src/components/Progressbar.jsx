// Filename - Progress_bar.js

import React from "react";

const Progressbar = ({ progress }) => {

    if(!progress)
        progress = 0;
  return (
    <div className={`h-4 p-0.5 w-full bg-gray-200 rounded-full text-right`}>
      <div style={{ width: `${progress}%` }} className={`h-full p-0.5 bg-blue-500 rounded-xl text-right max-w-full flex items-center justify-end`}>
        <span className={`text-black font-bold text-xs `}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default Progressbar;
