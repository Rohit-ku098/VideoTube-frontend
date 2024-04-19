import { api } from "./conf";

const getVideoComments = async (videoId) => {
    try {
        const res = await api.get(`/comments/${videoId}`);
        return res.data?.data;
    } catch (error) {
        console.log(error);
    }
};

export {getVideoComments}