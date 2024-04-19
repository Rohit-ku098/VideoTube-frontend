import { api } from "./conf"

const toggleSubscribe = async (channelId) => {
    try {
        const res = await api.post(`subscriptions/c/${channelId}`); 
        return res.data?.data;
    } catch (error) {
        console.log(error)
    }
}

const getSubscriptionStatus = async (channelId) => {
    try {
        const res = await api.get(`/subscriptions/status/${channelId}`); 
        console.log(res.data)
        return res.data?.data;
    } catch (error) {
        console.log(error)
    }
}

export {toggleSubscribe, getSubscriptionStatus}