import React, { useEffect, useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import Loader from "../components/Loader";
import { getDashboardData } from "../services/dashboard.service";
import { formatViews } from "../utils/formatViews";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | VideoTube";
    setLoading(true);
    getDashboardData()
      .then((data) => {
        setChannelData(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setLoading(false)
      })

    return () => {
      document.title = "VideoTube";
    }
  }, []);

  if(loading) return <Loader />

  return (
    <div>
      <Navbar menubar={false} />
      <main className={`mt-[4.7rem] p-4`}>
        {/* <h1 className="p-4 text-3xl font-bold underline-offset-4 underline">Dashboard</h1> */}
        <section className="flex items-start justify-start gap-4 p-4 mb-10  ">
          {/* avatar and fullName username total subscribers*/}
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full">
            {/* avatar */}
            <img
              src={channelData?.avatar}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="space-y-3">
            {/* fullName */}
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ">
              {channelData?.fullName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <p>&#64;{channelData?.userName}</p>
              <p>{channelData?.subscribersCount} subscribers</p>
            </div>
          </div>
        </section>

        {/* Channel Analytics */}
        <h2 className="p-2 m-2 text-2xl font-bold  border-gray-300 dark:border-gray-400">
          Channel Analytics
        </h2>
        <section className="p-4 my-8 mb-16 flex flex-wrap items-center text-xl lg:text-2xl font-bold justify-center gap-6  rounded-xl">
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-2xl dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{channelData?.videosCount} </p>
            <p className="">videos</p>
          </div>
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-2xl dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{channelData?.tweetsCount}</p>
            <p>Blogs</p>
          </div>
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-2xl dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{channelData?.playlistsCount}</p>
            <p>Playlists</p>
          </div>
          <div className="h-28 w-36 md:h-32 md:w-48 lg:h-36 lg:w-56  flex flex-col items-center justify-center text-black dark:text-gray-200 border-2 border-black dark:border-gray-200 shadow-lg dark:shadow-slate-800 bg-gray-200 dark:bg-bgDarkSecondary  rounded-xl hover:scale-x-105 ease-in-out duration-300">
            <p>{formatViews(channelData?.totalViews)}</p>
            <p className="">Views</p>
          </div>
        </section>

        {/* dashboard content */}
        <section className="md:p-3 lg:p-4">
          <ul className="flex gap-6 text-lg font-medium text-gray-600 dark:text-gray-300 border-b-2 p-2 ">
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive ? "font-bold text-black dark:text-white " : ""
                }
                end
              >
                Videos
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/blogs"}
                state={{ userId: channelData?._id }}
                className={({ isActive }) =>
                  isActive ? "font-bold text-black dark:text-white " : ""
                }
                end
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/playlists"}
                state={{ userId: channelData?._id }}
                className={({ isActive }) =>
                  isActive ? "font-bold text-black dark:text-white " : ""
                }
                end
              >
                Playlists
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </section>
      </main>
    </div>
  );
}


export default Dashboard;
