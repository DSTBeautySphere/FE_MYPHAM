import { Product } from "@/types/product.type";
import { createSlice } from "@reduxjs/toolkit";

export interface ICartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface ICartState {
  isOpenModal: boolean;
  items: ICartItem[];
}

const initialState: ICartState = {
  isOpenModal: false,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openModal(state: ICartState, action: { payload: boolean }) {
      state.isOpenModal = action.payload;
    },
    addToCart(state: ICartState, action: { payload: ICartItem }) {
      const { product, quantity, size } = action.payload;
      const existingItem = state.items.find((item) => item.product._id === product._id && item.size === size);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity, size });
      }
    },

    removeFromCart(state: ICartState, action: { payload: { id: string; size: string } }) {
      const { id, size } = action.payload;
      state.items = state.items.filter((item) => item.product._id !== id || item.size !== size);
    },
  },
});

export const { openModal, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
