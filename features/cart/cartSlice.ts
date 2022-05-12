import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState } from "../../interfaces";
import { RootState } from "../../store/store";

interface cartState {
  items: OrderState[];
  itemsCount: number;
}

const initialState: cartState = {
  items: [],
  itemsCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<OrderState>) => {
      state.items.push(action.payload);
      state.itemsCount += action.payload.quantity;
    },
    remove: (state, action: PayloadAction<string>) => {
      console.log("shoot");
      const orderItem = state.items.find(
        (item) => item.orderId == action.payload
      );
      if (orderItem && orderItem.quantity == 1) {
        const newItems = state.items.filter(
          (item) => item.orderId !== action.payload
        );
        state.items = newItems;
        state.itemsCount -= 1;
      } else {
        const orderIndex = state.items.findIndex(
          (item) => item.orderId == action.payload
        );
        state.items[orderIndex].quantity -= 1;
        state.itemsCount -= 1;
      }
    },
  },
});

export const { add, remove } = cartSlice.actions;

export const selectItemsCount = (state: RootState) => state.cart.itemsCount;
export const selectItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
