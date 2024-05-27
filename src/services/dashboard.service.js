import { api } from "./conf";

const getDashboardData = async () => {
    try {
        const res = await api.get("/dashboard/stats");
        return res.data?.data;
    } catch (error) {
        throw error;
    }
};

const getDashboardVideos = async () => {
    try {
        const res = await api.get("/dashboard/videos");
        return res.data?.data;
    } catch (error) {
        throw error;
    }
};



export {
    getDashboardData,
    getDashboardVideos,

}