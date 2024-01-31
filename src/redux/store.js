import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settingsSlice";
import favouriteSlice from "./favouriteSlice";
export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    favourites: favouriteSlice,
  },
});
