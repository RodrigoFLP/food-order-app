import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";
import { api } from "../services/auth";
import { fetchAuth } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.dispatch(fetchAuth());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
