export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const productId = action.payload._id;
      const updatedProducts = state.products.map((prod) =>
        prod._id === productId && prod.instock > 0
          ? { ...prod, instock: prod.instock - 1 }
          : prod
      );
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
        products: updatedProducts,
      };
    }

    case "REMOVE_FROM_CART": {
      const productId = action.payload._id;
      const updatedProducts = state.products.map((prod) =>
        prod._id === productId
          ? { ...prod, instock: prod.instock + 1 }
          : prod
      );
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== productId),
        products: updatedProducts,
      };
    }

    case "UPDATE_CART_ITEM": {
      const updatedCart = state.cart.map((item) =>
        item._id === action.payload._id
          ? { ...item, qty: Number(action.payload.qty) }
          : item
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }

    default:
      return state;
  }
};
