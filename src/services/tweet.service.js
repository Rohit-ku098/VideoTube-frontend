import { api } from "./conf";

const createTweet = async (data) => {
    try {
        const res = await api.post("/tweets", data)
        return res.data?.data        
    } catch (error) {
        throw error.response.data.message;
    }
}

const getUserTweets = async (userId) => {
    try {
        const res = await api.get(`/tweets/u/${userId}`)
        return res.data?.data        
    } catch (error) {
        throw error.response.data.message;
    }
}

const getAllTweets = async (params) => {
  try {
    console.log(params);
    const res = await api.get(`/tweets`, { params: params });
    return res.data?.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

const updateTweet = async (tweetId, data) => {
    try {
        const res = await api.patch(`/tweets/${tweetId}`, data)
        return res.data?.data        
    } catch (error) {
        throw error.response.data.message;
    }
}

const deleteTweet = async (tweetId) => {
    try {
        const res = await api.delete(`/tweets/${tweetId}`)
        return res.data?.data        
    } catch (error) {
        throw error.response.data.message;
    }
}

export  { 
    createTweet,
    getUserTweets,
    getAllTweets,
    updateTweet,
    deleteTweet
}