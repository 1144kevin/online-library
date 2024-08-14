import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favoriteSlice";

const store = configureStore({
  reducer: {
    book: favoriteSlice
  }
})
export type RootState = ReturnType<typeof store.getState>;
export default store;
