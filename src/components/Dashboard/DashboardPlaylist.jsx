import React, { useState, useEffect } from "react";
import PlaylistCard from "../Playlist/PlaylistCard";
import { getUserPlaylist } from "../../services/playlist.service";
import { useLocation } from "react-router-dom";
import Loader from "../Loader";
import { toast } from "react-toastify";


function DashboardPlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const userId = location?.state?.userId;
  console.log("Dashboard playlist");
  useEffect(() => {
    setLoading(true);
    getUserPlaylist(userId)
      .then((data) => {
        setPlaylists(data);
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setLoading(false);
      })
  }, [userId]);

  if (loading) return <Loader />;
  return (
    <div>
      {playlists?.map((playlist) => (
        playlist && <div className="bg-gray-200 dark:bg-bgDarkSecondary m-2 p-2 rounded-xl ">
          <PlaylistCard
            key={playlist?._id}
            playlistId={playlist?._id}
            wraped={true}
            threeDotsVisible={true}
          />
        </div>
      ))}
    </div>
  );
}

export default DashboardPlaylist