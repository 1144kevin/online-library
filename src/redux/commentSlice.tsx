import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  commentId: string;
  rating: number;
}

interface CommentState {
  likedComments: Record<string, boolean>;
  ratings: Record<string, number>; // Store ratings by commentId
}

const initialState: CommentState = {
  likedComments: {},
  ratings: {},
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const commentId = action.payload;
      state.likedComments[commentId] = !state.likedComments[commentId];
    },
    setRating: (state, action: PayloadAction<Comment>) => {
      const { commentId, rating } = action.payload;
      state.ratings[commentId] = rating;
    },
  },
});

export const { toggleLike, setRating } = commentSlice.actions;
export default commentSlice.reducer;
