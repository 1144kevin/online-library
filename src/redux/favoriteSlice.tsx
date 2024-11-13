import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  bookIds: string[];
}

const initialState: FavoriteState = {
  bookIds: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.bookIds.indexOf(action.payload);
      // if (index !== -1) {
      //   state.bookIds.splice(index, 1);
      // } else {
      //   state.bookIds.push(action.payload);
      // }

      if (index >= 0) {
        state.bookIds.splice(index, 1);
        return;
      } 
      
      state.bookIds.push(action.payload);

    },
    removeFavoriteById: (state, action: PayloadAction<string>) => {
      state.bookIds = state.bookIds.filter((id) => id !== action.payload);
    },
  },
});

export default favoriteSlice.reducer;
export const { toggleFavorite, removeFavoriteById } = favoriteSlice.actions;
