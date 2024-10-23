import { configureStore } from "@reduxjs/toolkit";//Redux Toolkit 提供的簡化配置 Redux Store 的方法。
import favoriteSlice from "./favoriteSlice";
import themeSlice from "./themeSlice"; // Import the theme slice

//將 store 看作是一個全局的狀態管理器，應用程序中的每一個 component 都可以從 store 中讀取數據或分派（dispatch）動作來修改數據。
const store = configureStore({

  //這些 reducer 用於響應分派的動作並更新 store 中的狀態。store 中的 book 狀態是由 favoriteSlice 來管理的
  reducer: {
    book: favoriteSlice,
    theme: themeSlice, // Add the theme slice to the store
  }
})

//創建了一個 RootState 類型，用於表示 Redux Store 中的整個狀態樹的類型。
//ReturnType<typeof store.getState> 是 TypeScript 的一個實用工具，它會推斷出 store.getState 函數的返回值類型。
export type RootState = ReturnType<typeof store.getState>;
export default store;
