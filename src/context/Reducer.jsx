export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // 1) Decrement product stock in state.products
      //    - map over every product `p`
      //    - check if `p._id` matches the added item AND there's stock left
      //    - if yes, return a new object with instock - 1
      //    - otherwise return the original `p`
      const updatedProducts = state.products.map(p =>
        p._id === action.payload._id && p.instock > 0
          ? { ...p, instock: p.instock - 1 }
          : p
      );

      // 2) Add to cart or bump qty in state.cart
      //    - find if item already exists in cart
      const inCart = state.cart.find(item => item._id === action.payload._id);
      let updatedCart;
      if (inCart) {
        // if found, map and increment its qty
        updatedCart = state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        // if not found, append it with qty: 1
        updatedCart = [...state.cart, { ...action.payload, qty: 1 }];
      }

      return {
        ...state,
        products: updatedProducts,
        cart: updatedCart
      };
    }

    case "REMOVE_FROM_CART": {
      // 1) Locate the cart item to know how many to restore
      const toRemove = state.cart.find(item => item._id === action.payload._id);
      const removedQty = toRemove ? toRemove.qty : 0;

      // 2) Remove that item line entirely from cart
      const updatedCart = state.cart.filter(
        item => item._id !== action.payload._id
      );

      // 3) Restore that qty back into the product’s instock
      //    - map over products, and for the matching _id, increase instock
      const updatedProducts = state.products.map(p =>
        p._id === action.payload._id
          ? { ...p, instock: p.instock + removedQty }
          : p
      );

      return {
        ...state,
        products: updatedProducts,
        cart: updatedCart
      };
    }

    default:
      // If action type isn't recognized, return current state unchanged
      return state;
  }
};
