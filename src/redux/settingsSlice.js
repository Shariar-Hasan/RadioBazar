import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: JSON.parse(localStorage.getItem("settings")) || {
    autoPlay: true,
    loop: true,
    volume: 1,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, { payload }) => {
      state.settings = { ...payload };
      localStorage.setItem("settings", JSON.stringify(state.settings));
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
