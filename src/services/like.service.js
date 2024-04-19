import { api } from "./conf";

const toggleVideoLike = async (videoId) => {
  try {
    const res = await api.post(`/likes/toggle/v/${videoId}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};
const toggleCommentLike = async (commentId) => {
  try {
    const res = await api.post(`/likes/toggle/c/${commentId}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};
const toggleTweetLike = async (tweetId) => {
  try {
    const res = await api.post(`/likes/toggle//t${tweetId}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
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
const getCommentLikeInfo = async (videoId) => {
  try {
    const res = await api.get(`/likes/v/${videoId}`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};
const getTweetLikeInfo = async (videoId) => {
  try {
    const res = await api.get(`/likes/v/${videoId}`);
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
