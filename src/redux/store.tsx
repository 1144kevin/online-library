import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favoriteSlice";

const store = configureStore({
  reducer:{
    book:favoriteSlice
  }

  })

  export default store;