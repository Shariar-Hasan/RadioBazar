import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteList: JSON.parse(localStorage.getItem("favouriteList")) || [],
};

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourite: (state, { payload }) => {
      state.favouriteList = [...state.favouriteList, payload];
      localStorage.setItem(
        "favouriteList",
        JSON.stringify(state.favouriteList)
      );
    },
    removeFromFavourite: (state, { payload }) => {
      state.favouriteList = state.favouriteList.filter((f) => f.id !== payload);
      localStorage.setItem(
        "favouriteList",
        JSON.stringify(state.favouriteList)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSettings } = favouriteSlice.actions;

export default favouriteSlice.reducer;
