import { api } from "./conf";

const toggleVideoLike = async (videoId) => {
  try {
    const res = await api.post(`/likes/toggle/v/${videoId}`);
    return res.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
const toggleCommentLike = async (commentId) => {
  try {
    const res = await api.post(`/likes/toggle/c/${commentId}`);
    return res.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
const toggleTweetLike = async (tweetId) => {
  try {
    const res = await api.post(`/likes/toggle/t/${tweetId}`);
    return res.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const getVideoLikeInfo = async (videoId) => {
  try {
    const res = await api.get(`/likes/v/${videoId}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};
const getCommentLikeInfo = async (commentId) => {
  try {
    const res = await api.get(`/likes/c/${commentId}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};
const getTweetLikeInfo = async (tweetId) => {
  try {
    const res = await api.get(`/likes/t/${tweetId}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getVideoLikeInfo,
  getCommentLikeInfo,
  getTweetLikeInfo,
};
