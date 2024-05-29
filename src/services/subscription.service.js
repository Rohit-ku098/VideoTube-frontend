import { api } from "./conf"

const toggleSubscribe = async (channelId) => {
    try {
        const res = await api.post(`subscriptions/c/${channelId}`); 
        return res.data?.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

const getSubscriptionStatus = async (channelId) => {
    try {
        const res = await api.get(`/subscriptions/status/${channelId}`); 
        console.log(res.data)
        return res.data?.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export {toggleSubscribe, getSubscriptionStatus}