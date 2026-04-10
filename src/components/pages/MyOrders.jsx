import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/my", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-xl font-bold">No orders yet</h2>
          <Link to="/" className="text-blue-600 mt-3 inline-block">
            Start shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Order ID: #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {item.title} × {item.qty}
                    </span>
                    <span>Rs {item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>Rs {order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
