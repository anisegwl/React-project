export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c._id === action.payload._id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
  }
};