import React, { useEffect, useState, useRef } from 'react'
import Modal from '../Modal'
import { getUserPlaylist, addVideoToPlaylist, createPlaylist, removeVideoFromPlaylist } from '../../services/playlist.service'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Input from '../Input'

function PlaylistModal({videoId, setShowModal}) {

    const [playlists, setPlaylists] = useState([])
   
    const {user} = useSelector(state => state.user)
    const [openInputBox, setOpenInputBox] = useState(false)
    const { register, handleSubmit } = useForm()

    
    useEffect(() => {
        getUserPlaylist(user?._id)
        .then(res => {
            let playlists = res?.map((playlist) => playlist?.videos?.includes(videoId) ? { ...playlist, checked: true } : {...playlist, checked: false})
            setPlaylists(playlists)
        })
        .catch(error => {
            toast.error(error, {
              position: "bottom-left",
            });
        })
    }, [user])

    const handleAddVideoToPlaylist = async (playlist) => {
        try {
          await addVideoToPlaylist(videoId, playlist?._id)
          toast.success(`Video added to ${playlist.name}`, {
            position: "bottom-left"
          })
        } catch (error) {
          toast.error(error, {
            position: "bottom-left",
          });
        }
    }

    const handleRemoveVideoFromPlaylist  = async (playlist) => {
        try {
          await removeVideoFromPlaylist(videoId, playlist?._id)
          toast.error(`Video removed from ${playlist.name}`, {
            position: "bottom-left"
          })
        } catch (error) {
          toast.error(error, {
            position: "bottom-left",
          });
        }
    }

    console.log(playlists)
    console.log('playlist model render')

    const handleChange = (e, playlist) => {
        setPlaylists((prev) =>
          prev.map((p) =>
            p?._id === playlist?._id ? { ...p, checked: e.target.checked } : p
          )
        );

        if(e.target.checked) {
            handleAddVideoToPlaylist(playlist)
        } else {
            handleRemoveVideoFromPlaylist(playlist)
        }
       
      }

    const handleCreatePlaylist = async (data) => {
        try {
          const playlist = await createPlaylist(data.name, data.description)
          setPlaylists([...playlists, playlist])
          setOpenInputBox(false)
        } catch (error) {
          toast.error(error, {
            position: "bottom-left",
          });
        }
    }

    return (
      <div>
        <Modal
          title="Choose a playlist"
          onCancel={() => setShowModal(false)}
        >
          <div>
            {playlists?.map((playlist) => (
              <div
                className="w-full flex items-center gap-2"
                key={playlist?._id}
              >
                <input
                  type="checkbox"
                  id={playlist?._id}
                  checked={playlist?.checked}
                  onChange={(e) => handleChange(e, playlist)}
                />
                <label htmlFor={playlist?._id}>{playlist?.name}</label>
              </div>
            ))}
          </div>
          <div>
            {!openInputBox ? (
              <button
                className="w-full flex items-center gap-2 mt-2"
                onClick={() => setOpenInputBox(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Create a playlist
              </button>
            ) : (
              <form className="" onSubmit={handleSubmit(handleCreatePlaylist)}>
                <Input
                  placeholder="Playlist name"
                  className="mt-2 p-1"
                  {...register("name", { required: true })}
                />
                <button
                  type="submit"
                  className="font-bold bg-black dark:bg-white w-full text-center text-white dark:text-black mt-2 py-1 rounded-xl text-sm"
                >
                  Create
                </button>
              </form>
            )}
          </div>
        </Modal>
      </div>
    );
}

export default PlaylistModal
