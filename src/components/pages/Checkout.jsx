import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../../context/product/ProductContext";
import { toast } from "react-toastify";

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

const Checkout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to checkout");
      navigate("/login");
    }
  }, [navigate]);

  const { cart, cartSubtotal, updateCartQty, removeFromCart, clearCart } =
    useContext(ProductContext);

  const [placing, setPlacing] = useState(false);

  // delivery rules
  const [deliveryType, setDeliveryType] = useState("inside"); // inside | outside
  const deliveryFee = useMemo(() => {
    return deliveryType === "inside" ? 100 : 200;
  }, [deliveryType]);

  const total = useMemo(
    () => Number(cartSubtotal || 0) + Number(deliveryFee || 0),
    [cartSubtotal, deliveryFee]
  );

  // shipping form
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
    paymentMethod: "cod", // cod | online
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (!form.phone.trim()) return "Phone number is required";
    if (form.phone.trim().length < 7) return "Phone number looks too short";
    if (!form.city.trim()) return "City is required";
    if (!form.address.trim()) return "Address is required";
    if (!cart || cart.length === 0) return "Your cart is empty";
    return null;
  };

  // ✅ BACKEND ORDER PLACE
  const placeOrder = async () => {
    if (placing) return;

    const err = validate();
    if (err) {
      toast.error(`❌ ${err}`);
      return;
    }

    // Build payload for backend
    const payload = {
      customer: {
        fullName: form.fullName,
        phone: form.phone,
        city: form.city,
        address: form.address,
        notes: form.notes,
      },
      paymentMethod: form.paymentMethod,
      deliveryType,
      deliveryFee,
      subtotal: cartSubtotal,
      total,
      items: cart.map((it) => {
        const price = Number(it.price ?? 0);
        const discount = Number(it.discount ?? 0);
        const final = Math.max(price - discount, 0);
        const qty = Number(it.qty ?? 1);

        return {
          productId: it._id,
          title: it.title || it.name,
          price: final,
          qty,
        };
      }),
    };

    try {
      setPlacing(true);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
       headers: {
  "Content-Type": "application/json",
  "auth-token": localStorage.getItem("token") || "",
},

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`❌ ${data?.message || "Order failed"}`);
        setPlacing(false);
        return;
      }

      toast.success("✅ Order placed successfully");
      clearCart();

      // ✅ recommended: go to success page
      navigate(`/order-success/${data.orderId}`);
    } catch (e) {
      console.error(e);
      toast.error("❌ Server not reachable");
    } finally {
      setPlacing(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <p className="text-gray-600 mt-2">Your cart is empty.</p>
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-gray-600 mt-1">
            Review your order and enter delivery details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900">Delivery</h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType("inside")}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    deliveryType === "inside"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    Inside Kathmandu
                  </div>
                  <div className="text-sm text-gray-600">
                    Delivery fee: Rs 100
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType("outside")}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    deliveryType === "outside"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    Outside Kathmandu
                  </div>
                  <div className="text-sm text-gray-600">
                    Delivery fee: Rs 200
                  </div>
                </button>
              </div>
            </div>

            {/* Shipping form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Shipping details
              </h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Full name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Biraj Shrestha"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    City
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kathmandu"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Street, Ward, Landmark..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Order notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any instructions for delivery..."
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900">Payment method</h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setForm((p) => ({ ...p, paymentMethod: "cod" }))
                  }
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    form.paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    Cash on Delivery
                  </div>
                  <div className="text-sm text-gray-600">
                    Pay when you receive the order
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm((p) => ({ ...p, paymentMethod: "online" }))
                  }
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    form.paymentMethod === "online"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    Online payment
                  </div>
                  <div className="text-sm text-gray-600">eSewa / Khalti (later)</div>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
                <Link
                  to="/cartitems"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Edit cart
                </Link>
              </div>

              <div className="mt-4 space-y-4">
                {cart.map((it) => {
                  const price = Number(it.price ?? 0);
                  const discount = Number(it.discount ?? 0);
                  const final = Math.max(price - discount, 0);
                  const qty = Number(it.qty ?? 1);

                  return (
                    <div key={it._id} className="flex gap-3">
                      <img
                        src={resolveImage(it)}
                        alt={it.title || it.name}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-100 border border-gray-100"
                        onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-gray-900 line-clamp-1">
                              {it.title || it.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              Rs {money(final)} × {qty}
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(it._id)}
                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                            disabled={placing}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => updateCartQty(it._id, qty - 1)}
                            disabled={placing}
                          >
                            -
                          </button>
                          <div className="min-w-[38px] text-center font-semibold">
                            {qty}
                          </div>
                          <button
                            className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                            onClick={() => updateCartQty(it._id, qty + 1)}
                            disabled={placing}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t pt-4 space-y-2">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs {money(cartSubtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-gray-700">
                  <span>Delivery fee</span>
                  <span className="font-semibold">Rs {money(deliveryFee)}</span>
                </div>

                <div className="flex items-center justify-between text-gray-900 text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">Rs {money(total)}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing}
                className="mt-6 w-full rounded-xl bg-gray-900 text-white py-3 font-semibold hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {placing ? "Placing order..." : "Place Order"}
              </button>

              <p className="mt-3 text-xs text-gray-500">
                By placing an order, you agree to our terms and privacy policy.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900">Need help?</h3>
              <p className="text-sm text-gray-600 mt-2">
                Contact us for delivery & product questions.
              </p>
              <Link
                to="/contact-us"
                className="inline-block mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
