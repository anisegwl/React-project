import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CartContext from "./CartContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart/getcart", {
        headers: { "auth-token": token },
      });
      setCart(res.data.cartItems.items); // adjust based on backend response
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/addcart",
        { productId, quantity: 1 },
        { headers: { "auth-token": token } }
      );
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.put(
        "http://localhost:5000/api/cart/removecart",
        { productId },
        { headers: { "auth-token": token } }
      );
      fetchCart();
    } catch (err) {
      console.error("Remove from cart error", err);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
