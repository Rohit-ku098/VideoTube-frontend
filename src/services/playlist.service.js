import { api } from "./conf";

const createPlaylist = async (name, description) => {
  try {
    const playlist = await api.post("/playlist", {
      name,
      description,
    });

    return playlist.data?.data;
  } catch (error) {
    throw error;
  }
};

const getPlaylistById = async (id) => {
  try {
    const res = await api.get(`/playlist/${id}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

const updatePlaylist = async (id, name, description) => {
  try {
    const res = await api.patch(`/playlist/${id}`, { name, description });
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

const deletePlaylist = async (id) => {
  try {
    const res = await api.delete(`/playlist/${id}`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

const getUserPlaylist = async (userid) => {
  try {
    const res = await api.get(`/playlist/user/${userid}`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

const getChannelPlaylists = async (userName) => {
   try {
    const res = await api.get(`/playlist/channel/${userName}`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
}

const addVideoToPlaylist = async (videoId, playlistId) => {
  try {
    const res = await api.patch(
      `/playlist/add/${videoId}/${playlistId}`
    );
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const res = await api.patch(`/playlist/remove/${videoId}/${playlistId}`);
    return res.data?.data;
  } catch (error) {
    throw error
  }
}
export {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getUserPlaylist,
  getChannelPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist
};
