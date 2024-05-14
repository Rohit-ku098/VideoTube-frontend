import { api } from "./conf";

api.get("/healthcheck").then((res) => console.log(res.data));

const logoutUser = async () => {
  try {
    const res = await api.post("/users/logout");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserChannelProfile = async (userName) => {
  try {
    const res = await api.get(`/users/c/${userName}`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

const getUserWatchHistory = async () => {
  try {
    const res = await api.get(`/users/watch-history`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

const clearWatchHistory = async () => {
  try {
    const res = await api.patch(`/users/watch-history`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};

const removeVideoFromWatchHistory = async (videoId) => {
  try {
    const res = await api.patch(`/users/watch-history/${videoId}`);
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};
export {
  logoutUser,
  getUserChannelProfile,
  getUserWatchHistory,
  clearWatchHistory,
  removeVideoFromWatchHistory,
};