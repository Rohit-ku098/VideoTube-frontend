import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMenuOpen: false,
}
const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
    },
});

export const { toggleMenu } = navbarSlice.actions;
export default navbarSlice.reducer