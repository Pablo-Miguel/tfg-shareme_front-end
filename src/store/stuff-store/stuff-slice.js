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
    }
  }
});

export const stuffActions = stuffSlice.actions;

export default stuffSlice.reducer;
