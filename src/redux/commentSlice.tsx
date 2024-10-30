import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommentState {
  likedComments: Record<string, boolean>;
}

const initialState: CommentState = {
  likedComments: {},
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {//定義 action 的有效負載（payload）類型
      const commentId = action.payload;
      state.likedComments[commentId] = !state.likedComments[commentId];//翻轉狀態
    },
  },
});

export const { toggleLike } = commentSlice.actions;
export default commentSlice.reducer;
