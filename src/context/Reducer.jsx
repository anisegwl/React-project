export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
     
      if (state.cart.find(item => item._id === action.payload._id)) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }]
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload._id)
      };

    default:
      return state;
  }
};
