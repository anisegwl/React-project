import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const money = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-IN");
};

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/api/orders/${id}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(`❌ ${data?.message || "Order not found"}`);
          navigate("/", { replace: true });
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Server not reachable");
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      navigate("/", { replace: true });
      return;
    }

    load();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          Loading order...
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-2xl w-full">
        <div className="text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Order Placed Successfully 🎉
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you! Your order has been received and is being processed.
          </p>
        </div>

        <div className="mt-8 bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-gray-500">Order ID</div>
              <div className="font-bold text-gray-900 break-all">{order._id}</div>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
              {order.status}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Name:</span> {order.customer?.fullName}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {order.customer?.phone}
            </div>
            <div>
              <span className="font-semibold">City:</span> {order.customer?.city}
            </div>
            <div>
              <span className="font-semibold">Address:</span> {order.customer?.address}
            </div>
            <div>
              <span className="font-semibold">Payment:</span>{" "}
              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
            </div>
          </div>

          <div className="mt-6">
            <div className="font-bold text-gray-900 mb-3">Items</div>

            <div className="space-y-3">
              {order.items?.map((it, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{it.title}</div>
                    <div className="text-sm text-gray-600">
                      Rs {money(it.price)} × {it.qty}
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">
                    Rs {money(it.lineTotal)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">Rs {money(order.subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Delivery</span>
              <span className="font-semibold">Rs {money(order.deliveryFee)}</span>
            </div>

            <div className="flex justify-between text-gray-900 text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs {money(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition text-center"
          >
            Continue Shopping
          </Link>

          <Link
            to="/contact-us"
            className="px-6 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition text-center"
          >
            Contact Support
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          You may receive a confirmation call/message shortly.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
