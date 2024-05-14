import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPlaylists: [],
};

const playlistSlice = createSlice({
    name: "userPlaylists",
    initialState,
    reducers: {
        setUserPlaylists: (state, action) => {
            state.userPlaylists = action.payload;
        },
    },
})

export default playlistSlice.reducer
export const { setUserPlaylists } = playlistSlice.actions