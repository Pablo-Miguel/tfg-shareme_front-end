import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stuff: [],
  page: 1,
  limit: 10,
  total: 0,
  error: null,
  isLoading: false
};

const stuffSlice = createSlice({
  name: "stuff",
  initialState,
  reducers: {
    setStuff(state, action) {
      state.stuff = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    likeStuff(state, action) {
      state.stuff = state.stuff.map((item) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            likes: action.payload.likes
          };
        }
        return item;
      });
    },
    viewStuff(state, action) {
      state.stuff = state.stuff.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            views: item.views + 1
          };
        }
        return item;
      });
    }
  }
});

export const stuffActions = stuffSlice.actions;

export default stuffSlice.reducer;
