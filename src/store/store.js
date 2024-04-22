import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbarSlice";
import userSlice from "./userSlice";
import videoSlice from "./videoSlice";

const store = configureStore({
    reducer: {
        navbar: navbarSlice,
        user: userSlice,
        videos: videoSlice
    },
});

export default store