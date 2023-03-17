import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-store/auth-slice";
import stuffReducer from "./stuff-store/stuff-slice";

const store = configureStore({
  reducer: { auth: authReducer, stuff: stuffReducer },
});

export default store;
