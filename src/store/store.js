import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbarSlice";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";
import playlistSlice from "./playlistSlice";
import tweetSlice from "./tweetSlice";

const store = configureStore({
    reducer: {
        navbar: navbarSlice,
        user: userSlice,
        videos: videoSlice,
        playlist: playlistSlice,
        tweet: tweetSlice,
    },
});

export default store