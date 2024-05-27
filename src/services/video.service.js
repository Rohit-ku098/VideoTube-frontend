import { api } from "./conf";
const getAllVideos = async (params) => {
    try {
        const response = await api.get("/videos", { params: params });
        console.log(response.data);
        return response.data?.data;
    } catch (error) {
        throw error
    }
};

const getVideoById = async (videoId) => {
    try {
        const response = await api.get(`/videos/${videoId}`);
        console.log(response.data);
        return response.data?.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteVideo = async (videoId) => {
    try {
        const response = await api.delete(`/videos/${videoId}`);
        console.log(response.data);
        return response.data?.data;
    } catch (error) {
        console.log(error);
    }
};

const togglePublishStatus = async (videoId, status) => {
  try {
    console.log(status)
    const res = await api.patch(`/videos/toggle/publish/${videoId}`, {
      isPublished: status,
    });
    return res.data?.data;
  } catch (error) {
    throw error;
  }
};
export { getAllVideos, getVideoById, deleteVideo, togglePublishStatus }