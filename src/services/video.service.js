import { api } from "./conf";
const getAllVideos = async (params) => {
    try {
        const response = await api.get("/videos", { params: params });
        return response.data?.data;
    } catch (error) {
        console.log(error);
    }
};

const getVideoById = async (videoId) => {
    try {
        const response = await api.get(`/videos/${videoId}`);
        return response.data?.data;
    } catch (error) {
        console.log(error);
    }
};

export { getAllVideos, getVideoById,  }