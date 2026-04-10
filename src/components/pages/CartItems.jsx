import React, { useContext } from "react";
import ProductContext from "../../context/product/ProductContext";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000";
const FALLBACK_IMG = "https://via.placeholder.com/200x200.png?text=No+Image";

function resolveImage(item) {
  const img = item?.image;

  if (Array.isArray(img) && img.length > 0) {
    const first = img[0];
    if (!first) return FALLBACK_IMG;
    if (first.startsWith("http")) return first;
    if (first.startsWith("/uploads/")) return `${API_BASE}${first}`;
    return `${API_BASE}/uploads/${first}`;
  }

  if (typeof img === "string" && img) {
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads/")) return `${API_BASE}${img}`;
    return `${API_BASE}/uploads/${img}`;
  }

  return FALLBACK_IMG;
}

const money = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-IN");
};

const CartItems = () => {
  const { cart, removeFromCart, updateCartQty, cartSubtotal, clearCart } =
    useContext(ProductContext);

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-600 mt-2">Add some products to continue.</p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition"
          >
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
          <button
            onClick={clearCart}
            className="text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((it) => {
              const price = Number(it.price ?? 0);
              const discount = Number(it.discount ?? 0);
              const final = Math.max(price - discount, 0);
              const qty = Number(it.qty ?? 1);
              const lineTotal = final * qty;

              return (
                <div
                  key={it._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4"
                >
                  <img
                    src={resolveImage(it)}
                    alt={it.title || it.name}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-100"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {it.title || it.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Rs {money(final)} each
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(it._id)}
                        className="text-sm text-red-600 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50"
                          onClick={() => updateCartQty(it._id, qty - 1)}
                        >
                          -
                        </button>
                        <div className="min-w-[40px] text-center font-semibold">
                          {qty}
                        </div>
                        <button
                          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50"
                          onClick={() => updateCartQty(it._id, qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="font-bold text-gray-900">
                        Rs {money(lineTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
            <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>

            <div className="mt-4 flex items-center justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">Rs {money(cartSubtotal)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-gray-600 text-sm">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>

            {/* ✅ Checkout Link */}
            <Link
              to="/checkout"
              className="mt-6 w-full inline-flex items-center justify-center rounded-xl bg-gray-900 text-white py-3 font-semibold hover:bg-black transition"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="block mt-3 text-center text-sm font-semibold text-gray-700 hover:text-black"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
