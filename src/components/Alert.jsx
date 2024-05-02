import React, {useState, useEffect} from 'react'

function Alert({message, timeout=2000}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const timer = setTimeout(() => {
          setMounted(false);
        }, timeout);

    }, [])

    
  return (
    <div className=" p-4 w-full">
      {
        <div
          className={`w-full  md:w-fit  py-4 px-8  bg-black dark:bg-white text-white dark:text-black border-2 border-gray-300 rounded-2xl shadow-xl transition-all  duration-700 ${
            mounted ? "translate-y-0 " : "translate-y-64"
          }`}
        >
          <p className="">{message}</p>
        </div>
      }
    </div>
  );
}

export default Alert
