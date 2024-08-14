import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookDataType2 } from "../assets/data";

interface FavoriteBook {
  book: bookDataType2;
}
interface FavoriteState {
  book: FavoriteBook[];
}

const initialState: FavoriteState = {
  book: []
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteBook>) => {
      const exists = state.book.some(
        (favoriteBook) => favoriteBook.book.id === action.payload.book.id
      );
      if (!exists) {
        state.book.push(action.payload);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<FavoriteBook>) => {
      state.book = state.book.filter(
        (x) => x.book.id !== action.payload.book.id
      );
    }
  }
})

export default favoriteSlice.reducer;
export const { addToFavorite,removeFromFavorite } = favoriteSlice.actions;