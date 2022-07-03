import { configureStore, isAnyOf } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import { fetchAuth } from "./auth/authSlice";
import cartSlice, {
  add,
  incrementItemQuantity,
  loadCart,
  remove,
} from "./cart/cartSlice";

import { api } from "../services/api";

import { startAppListening, listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

// listernerMiddleware to persist cart to localStorage
startAppListening({
  matcher: isAnyOf(incrementItemQuantity, add, remove),
  effect: async (action, listenerApi) => {
    try {
      const cart = JSON.stringify(listenerApi.getState().cart);
      localStorage.setItem("cart", cart);
    } catch (err) {
      console.log(err);
    }
  },
});

//dispatch async thunk to fetch user data
store.dispatch(fetchAuth());

//dispatch async thunk to load cart data
store.dispatch(loadCart());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
