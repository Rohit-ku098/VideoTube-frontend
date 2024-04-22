import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  isSearchOpen: false,
};
const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setIsSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { toggleMenu, setIsSearchOpen } = navbarSlice.actions;
export default navbarSlice.reducer