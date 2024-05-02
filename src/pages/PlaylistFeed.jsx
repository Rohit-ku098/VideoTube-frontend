import React, { useEffect, useState } from 'react'
import PlaylistCard from '../components/Playlist/PlaylistCard';
import { useParams } from 'react-router-dom';
import { getUserPlaylist, getChannelPlaylists } from '../services/playlist.service';

function PlaylistFeed() {
  const { userId, userName } = useParams()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserPlaylist(userId)
    .then(res => {
      setPlaylists(res);
      setLoading(false)
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    })
  }, [userId])

  useEffect(() => {
    getChannelPlaylists(userName)
    .then(res => {
      setPlaylists(res);
      setLoading(false)
    })
    .catch(err => {
      console.log(err);
      setLoading(false)
    })
  }, [userName])

  console.log('playlists feed rendered')
  return (
    <div>
      <div className="grid place-content-center auto-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4  2xl:grid-cols-5  content-stretch">
        {playlists?.map((playlist) => (
          <PlaylistCard key={playlist?._id} playlistId={playlist?._id}/>
        ))}
      </div>
    </div>
  );
}

export default PlaylistFeed
