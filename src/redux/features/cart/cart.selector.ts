import { ICartState } from "@/redux/features/cart/cart.slice";

interface IState {
  cart: ICartState;
}

const selectShowCartModal = (state: IState) => state.cart.isOpenModal;
const selectCartItems = (state: IState) => state.cart.items;
const selectCartTotalPrice = (state: IState) => state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export { selectShowCartModal, selectCartItems, selectCartTotalPrice };
