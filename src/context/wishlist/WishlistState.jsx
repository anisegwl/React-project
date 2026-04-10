import React, { useReducer, useEffect, useState, useCallback } from "react";
import WishlistContext from "./WishlistContext";
import { toast } from "react-toastify";

// Simple reducer to manage wishlist state locally + sync with backend
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return { ...state, items: action.payload };
    case "ADD_ITEM":
      if (state.items.find((item) => item._id === action.payload._id)) return state;
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((item) => item._id !== action.payload) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
};

const WishlistState = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getWishlist = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: { "auth-token": token },
      });
      if (res.ok) {
        const data = await res.json();
        // Backend returns populated products array
        dispatch({ type: "SET_WISHLIST", payload: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  const addToWishlist = async (product) => {
    if (!token) {
      toast.error("Please login to add to wishlist.");
      return;
    }
    try {
      // Optimistic UI update
      dispatch({ type: "ADD_ITEM", payload: product });

      const res = await fetch("http://localhost:5000/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.message !== "Product already in wishlist") {
          toast.error("Failed to add to wishlist");
          // Revert optimistic
          dispatch({ type: "REMOVE_ITEM", payload: product._id });
        }
      } else {
        toast.success("❤️ Added to Wishlist");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) return;
    try {
      // Optimistic
      dispatch({ type: "REMOVE_ITEM", payload: productId });
      
      const res = await fetch(`http://localhost:5000/api/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });

      if (!res.ok) {
        toast.error("Failed to remove from wishlist");
        getWishlist(); // Refresh to ensure sync
      } else {
        toast.info("Removed from Wishlist");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.items,
        loading,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistState;
