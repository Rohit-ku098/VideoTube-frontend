import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./navbarSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        navbar: navbarSlice,
        user: userSlice
    },
});

export default store