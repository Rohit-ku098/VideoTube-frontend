import { api } from "./conf";

const getVideoComments = async (videoId) => {
    try {
        const res = await api.get(`/comments/${videoId}`);
        return res.data?.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

const addComment = async (videoId, data) => {
    try {
        const res = await api.post(`/comments/${videoId}`, data);
        return res.data?.data
    } catch (error) {
        throw error.response.data.message;
    }
}

const updateComment = async (commentId, data) => {
    try {
        const res = await api.patch(`/comments/c/${commentId}`, data);
        return res.data?.data
    } catch (error) {
        throw error.response.data.message;
    }
}

const deleteComment = async (commentId) => {
    try {
        const res = await api.delete(`/comments/c/${commentId}`);
        return res.data?.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export {getVideoComments, addComment, deleteComment, updateComment}