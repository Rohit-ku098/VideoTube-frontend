import React, { useEffect, useState } from 'react'
import PlaylistCard from '../components/Playlist/PlaylistCard';
import { useParams } from 'react-router-dom';
import { getUserPlaylist, getChannelPlaylists } from '../services/playlist.service';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPlaylists } from '../store/playlistSlice';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function PlaylistFeed({createPlaylistOption = false}) {
  const { userId, userName } = useParams()
  const dispatch = useDispatch()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false)
  const userPlaylists = useSelector(state => state.playlist.userPlaylists)


  useEffect(() => {
    if(userId) {
      setLoading(true);
      getUserPlaylist(userId)
        .then((res) => {
          dispatch(setUserPlaylists(res));
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error, {
            position: "bottom-left",
          });
          setLoading(false);
        });
    }
  }, [userId])

  useEffect(() => {
    setPlaylists(userPlaylists)
  }, [userPlaylists])

  useEffect(() => {
    if(userName) {
      getChannelPlaylists(userName)
        .then((res) => {
          setPlaylists(res);
        })
        .catch((error) => {
          toast.error(error, {
            position: "bottom-left",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userName])

  console.log('playlists feed rendered')
  // if(loading) return <Loader/>
  return (
    <div className=" px-4 relative w-full">
      {createPlaylistOption && (
        <div className="w-full p-2 pr-8 lg:pr-28 flex justify-between items-center bg-background dark:bg-backgroundDark z-20 fixed ">
          <h1 className="text-2xl font-bold">All Playlists</h1>

          <div className="">
            <button
              className="hover:bg-gray-200 hover:dark:bg-gray-700 px-3 py-2 rounded-full text-sm space-x-1"
              onClick={() => setOpenCreatePlaylist(true)}
            >
              <FontAwesomeIcon icon={faAdd} />
              <span>Create New Playlist</span>
            </button>
          </div>
        </div>
      )}
      {openCreatePlaylist && (
        <CreatePlaylistModal setOpen={setOpenCreatePlaylist} />
      )}
      <div
        className={`${
          createPlaylistOption ? "pt-16" : ""
        } grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5  content-stretch`}
      >
        {playlists?.map((playlist) => (
          <PlaylistCard key={playlist?._id} playlistId={playlist?._id} />
        ))}
      </div>
    </div>
  );
}



import Modal from "../components/Modal";
import Input from "../components/Input";
import { createPlaylist } from '../services/playlist.service';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function CreatePlaylistModal({setOpen}) {
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()
  const userPlaylists = useSelector(state => state.playlist.userPlaylists)
  
  const handleCreatePlaylist = async (data) => {
    try {
      const playlist = await createPlaylist(data.name, data.description);
      dispatch(setUserPlaylists([...userPlaylists, playlist]));
      setOpen(false);
      console.log("plalist created");
    } catch (error) {
      toast.error(error, {
        position: "bottom-left",
      });
      console.log(error); 
    }
  }
  return (
    <div>
      <Modal 
        title="Create Playlist" 
        confirmBtn="Create" 
        onCancel={() => setOpen(false)}
        onConfirm={handleSubmit(handleCreatePlaylist)}
      >
        <Input 
          label="Playlist Name" 
          className="mb-2" 
          {...register("name", { required: true })}
        />
        <Input 
          label="Description" 
          className="mb-2" 
          {...register("description")}
        />
      </Modal>
    </div>
  );
}
export default PlaylistFeed
