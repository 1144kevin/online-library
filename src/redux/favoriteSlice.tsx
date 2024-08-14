import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  book: string[];  // assuming the books are strings, you can adjust the type if necessary
}
const initialState: FavoriteState = {
  book: []
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<string>) => {
      state.book.push(action.payload)
    }
  }
})

export default favoriteSlice.reducer;
export const { addToFavorite } = favoriteSlice.actions;