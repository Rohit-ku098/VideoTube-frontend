import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [],
    channelTweets: [],
};

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        setTweets: (state, action) => {
            state.tweets = action.payload;
        },
        setChannelTweets: (state, action) => {
            state.channelTweets = action.payload;
        },
        addTweet: (state, action) => {
            state.tweets.unshift(action.payload);
        },
        updateTweet: (state, action) => {
            state.tweets = state.tweets.map((tweet) => {
                if (tweet._id === action.payload._id) {
                    return action.payload;
                }
                return tweet;
            });
            state.channelTweets = state.channelTweets.map((tweet) => {
                if (tweet._id === action.payload._id) {
                    return action.payload;
                }
                return tweet;
            });
        },
        deleteTweet: (state, action) => {
            state.tweets = state.tweets.filter(
              (tweet) => tweet._id !== action.payload
            );
            state.channelTweets = state.channelTweets.filter(
              (tweet) => tweet._id !== action.payload
            );
        }
    },
});

export default tweetSlice.reducer;
export const { setTweets, setChannelTweets, addTweet, updateTweet, deleteTweet } = tweetSlice.actions;
