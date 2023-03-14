import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utils/storage";

const initialState = {
    isLoggedIn: getAuthToken() ? true : false,
    user: null,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
        },
        update(state, action) {
            state.user = action.payload.user;
        },
        setError(state, action) {
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = null;
            }
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
