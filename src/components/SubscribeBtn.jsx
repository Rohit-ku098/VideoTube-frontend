import React from 'react'

function SubscribeBtn({isSubscribed, ...props}) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center ${
        isSubscribed ? "bg-[#cfcfcf5a] " : "dark:font-medium bg-black dark:bg-white text-white dark:text-black"
      }  text-sm px-4 py-2 rounded-2xl`}
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}

export default SubscribeBtn
