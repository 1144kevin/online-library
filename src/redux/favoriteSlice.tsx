import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookDataType } from "../assets/data";

interface FavoriteState {
  book: bookDataType[];
}

const initialState: FavoriteState = {
  book: []
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<bookDataType>) => {
      const index = state.book.findIndex(
        (favoriteBook) => favoriteBook.id === action.payload.id
      );
      if (index !== -1) {
        // 如果书籍已存在于收藏夹中，移除它并更新 isFavorite 为 false
        state.book.splice(index, 1);
      } else {
        // 如果书籍不在收藏夹中，添加它并设置 isFavorite 为 true
        state.book.push({ ...action.payload, isFavorite: true });
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.book = state.book.filter((book) => book.id !== action.payload);
    },
  }
});

export default favoriteSlice.reducer;
export const { toggleFavorite, removeFavorite } = favoriteSlice.actions;
