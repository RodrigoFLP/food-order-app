import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItemState } from "../../interfaces";
import { RootState } from "../store";

interface cartState {
  items: OrderItemState[];
  itemsCount: number;
  total: number;
}

const initialState: cartState = {
  items: [],
  itemsCount: 0,
  total: 0,
};

export const loadCart = createAsyncThunk("cart/loadCart", async (thunkApi) => {
  const serializedCart = localStorage.getItem("cart");
  if (serializedCart === null) {
    return undefined;
  }
  console.log(serializedCart);
  return JSON.parse(serializedCart);
});

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (thunkapi) => {
    localStorage.removeItem("cart");
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<OrderItemState>) => {
      action.payload = {
        ...action.payload,
        tagsGroups: [
          ...action.payload.tagsGroups.filter(
            (tagGroup) => tagGroup.quantity > 0
          ),
        ],
      };
      const productStringified = JSON.stringify({
        ...action.payload,
        orderItemId: 0,
        quantity: 0,
        price: 0,
      });
      const itemId = state.items.findIndex(
        (item) =>
          JSON.stringify({ ...item, orderItemId: 0, quantity: 0, price: 0 }) ===
          productStringified
      );

      console.log(itemId);

      if (itemId !== -1) {
        state.items[itemId].quantity += action.payload.quantity;
        state.itemsCount += action.payload.quantity;
        state.total += state.items[itemId].unitPrice * action.payload.quantity;
      }

      if (itemId === -1) {
        state.items.push(action.payload);
        state.itemsCount += action.payload.quantity;
        state.total += action.payload.price;
      }
    },
    incrementItemQuantity: (state, action: PayloadAction<string>) => {
      const orderIndex = state.items.findIndex(
        (item) => item.orderItemId == action.payload
      );
      state.items[orderIndex].quantity += 1;
      state.itemsCount += 1;
      state.total += state.items[orderIndex].unitPrice;
    },
    remove: (state, action: PayloadAction<string>) => {
      const orderItem = state.items.find(
        (item) => item.orderItemId == action.payload
      );
      if (orderItem && orderItem.quantity == 1) {
        const newItems = state.items.filter(
          (item) => item.orderItemId !== action.payload
        );
        state.items = newItems;
        state.itemsCount -= 1;
        state.total -= orderItem.unitPrice;
      } else {
        const orderIndex = state.items.findIndex(
          (item) => item.orderItemId == action.payload
        );

        state.items[orderIndex].quantity -= 1;
        state.itemsCount -= 1;
        state.total -= orderItem!.unitPrice;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.items;
          state.itemsCount = action.payload.itemsCount;
          state.total = action.payload.total;
        }
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = [];
        state.itemsCount = 0;
        state.total = 0;
      });
  },
});

export const { add, remove, incrementItemQuantity } = cartSlice.actions;

export const selectItemsCount = (state: RootState) => state.cart.itemsCount;
export const selectItems = (state: RootState) => state.cart.items;
export const selectTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
