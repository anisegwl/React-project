import { useEffect, useMemo, useReducer, useState } from "react";
import ProductContext from "./ProductContext";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/products";

function cartFromStorage() {
  try {
    const raw = localStorage.getItem("cart");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload || [] };

    case "ADD_TO_CART": {
      const item = action.payload;
      const qtyToAdd = action.qty ?? 1;

      const idx = state.cart.findIndex((c) => c._id === item._id);

      // already in cart => increase qty
      if (idx !== -1) {
        const updated = [...state.cart];
        updated[idx] = { ...updated[idx], qty: (updated[idx].qty || 1) + qtyToAdd };
        return { ...state, cart: updated };
      }

      // new item
      return { ...state, cart: [...state.cart, { ...item, qty: qtyToAdd }] };
    }

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((c) => c._id !== action.id) };

    case "UPDATE_QTY": {
      const { id, qty } = action;
      const updated = state.cart
        .map((c) => (c._id === id ? { ...c, qty } : c))
        .filter((c) => (c.qty || 0) > 0);
      return { ...state, cart: updated };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

const ProductState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: cartFromStorage(),
  });

  // loading/error for products
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState("");

  // persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // derived cart count
  const cartCount = useMemo(() => {
    return state.cart.reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
  }, [state.cart]);

  // derived subtotal
  const cartSubtotal = useMemo(() => {
    return state.cart.reduce((sum, it) => {
      const price = Number(it.price ?? 0);
      const discount = Number(it.discount ?? 0);
      const qty = Number(it.qty ?? 1);
      const final = Math.max(price - discount, 0);
      return sum + final * qty;
    }, 0);
  }, [state.cart]);

  // get products
  const getAllProducts = async (search = "", category = "") => {
    setLoadingProducts(true);
    setErrorProducts("");

    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);

      const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      dispatch({ type: "SET_PRODUCTS", payload: Array.isArray(data) ? data : [] });
    } catch (err) {
      setErrorProducts(err?.message || "Failed to load products");
      dispatch({ type: "SET_PRODUCTS", payload: [] });
    } finally {
      setLoadingProducts(false);
    }
  };

  // cart actions
  const addToCart = (product, qty = 1) => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to add to cart");
      return false;
    }
    if (!product?._id) return false;

    const cleaned = {
      _id: product._id,
      title: product.title || product.name || "Product",
      name: product.name || product.title || "Product",
      price: product.price ?? 0,
      discount: product.discount ?? 0,
      image: product.image ?? null,
      instock: product.instock ?? product.stock ?? 0,
    };

    dispatch({ type: "ADD_TO_CART", payload: cleaned, qty });
    return true;
  };

  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", id });

  const updateCartQty = (id, qty) => {
    const q = Number(qty);
    if (!Number.isFinite(q)) return;
    dispatch({ type: "UPDATE_QTY", id, qty: q });
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <ProductContext.Provider
      value={{
        // products
        products: state.products,
        getAllProducts,
        loadingProducts,
        errorProducts,

        // cart
        cart: state.cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
