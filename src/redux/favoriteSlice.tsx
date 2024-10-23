import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookDataType } from "../assets/data";

interface FavoriteState {
  book: bookDataType[];
}

const initialState: FavoriteState = {
  book: []
};

//管理收藏書籍的 Redux Slice
const favoriteSlice = createSlice({

  //這個 name 屬性為這個 Slice 命名為 'favorite'。在建立 Store 時，這個 Slice 的狀態將被存儲在 state.favorite 下。
  name: 'favorite',

  //initialState 在這裡作為 createSlice 函數的 initialState 屬性值，用於初始化 Redux Slice 的狀態。
  initialState,

  //更新狀態的 reducers
  reducers: {

    //action 通常還會有一個 payload 屬性，包含了你要更新狀態所需的數據。PayloadAction 用來幫助你定義 action 的 payload 類型。
    //PayloadAction<bookDataType> 表示 action 的 payload 屬性應該是一個 bookDataType 類型的對象。
    addToFavorite: (state, action: PayloadAction<bookDataType>) => {

      //檢查 state.book 數組中是否已經存在一個具有相同 id 的書籍對象。如果找到了，就返回 true，否則返回 false。
      const exists = state.book.some(
        (favoriteBook) => favoriteBook.id === action.payload.id
      );
      if (!exists) {
        state.book.push(action.payload);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<bookDataType>) => {
      state.book = state.book.filter(
        (x) => x.id !== action.payload.id
      );
    },
    updateFavorite: (state, action: PayloadAction<bookDataType>) => {
      const index = state.book.findIndex(
        (favoriteBook) => favoriteBook.id === action.payload.id
      );
      if (index !== -1) {
        state.book[index] = action.payload;
      }
    }
  }
})

export default favoriteSlice.reducer;
export const { addToFavorite, removeFromFavorite, updateFavorite } = favoriteSlice.actions;
