import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const API = "http://localhost:5000/api/admin/orders";

const money = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-IN");
};

const fmtDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const StatusPill = ({ status }) => {
  const cls =
    status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : status === "confirmed"
      ? "bg-blue-100 text-blue-800"
      : status === "shipped"
      ? "bg-indigo-100 text-indigo-800"
      : status === "delivered"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
};

const AdminOrders = () => {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [selected, setSelected] = useState(null); // order for modal
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (status) params.set("status", status);
      if (paymentMethod) params.set("paymentMethod", paymentMethod);

      const res = await fetch(`${API}?${params.toString()}`, {
        headers: { "auth-token": token || "" },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`❌ ${data?.message || "Failed to load orders"}`);
        setOrders([]);
        return;
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("❌ Server not reachable");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      const res = await fetch(`${API}/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token || "",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`❌ ${data?.message || "Failed to update status"}`);
        return;
      }

      toast.success("✅ Status updated");

      // Update local list
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? data.order : o))
      );

      // Update modal if open
      setSelected((prev) => (prev?._id === orderId ? data.order : prev));
    } catch (err) {
      console.error(err);
      toast.error("❌ Server not reachable");
    } finally {
      setUpdating(false);
    }
  };

  const filteredCount = useMemo(() => orders.length, [orders]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-1">
              Manage customer orders, update status, and view details.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Order ID / Name / Phone / City"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All</option>
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Payment</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All</option>
                <option value="cod">cod</option>
                <option value="online">online</option>
              </select>
            </div>

            <div className="flex items-end gap-3">
              <button
                onClick={fetchOrders}
                className="w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Apply
              </button>

              <button
                onClick={() => {
                  setQ("");
                  setStatus("");
                  setPaymentMethod("");
                  setTimeout(fetchOrders, 0);
                }}
                className="px-5 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing: <span className="font-semibold">{filteredCount}</span> orders
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4 font-semibold">Order</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Payment</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td className="px-6 py-6 text-gray-600" colSpan={7}>
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td className="px-6 py-6 text-gray-600" colSpan={7}>
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          #{String(o._id).slice(-6)}
                        </div>
                        <div className="text-xs text-gray-500">{o._id}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {o?.customer?.fullName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {o?.customer?.phone} • {o?.customer?.city}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {o.paymentMethod}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900">
                        Rs {money(o.total)}
                      </td>

                      <td className="px-6 py-4">
                        <StatusPill status={o.status} />
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {fmtDate(o.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelected(o)}
                          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-black transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Order ID</div>
                <div className="font-bold text-gray-900">{selected._id}</div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 font-semibold"
              >
                Close
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="font-bold text-gray-900">Customer</div>
                <div className="text-sm text-gray-700 mt-2">
                  <div><span className="font-semibold">Name:</span> {selected?.customer?.fullName}</div>
                  <div><span className="font-semibold">Phone:</span> {selected?.customer?.phone}</div>
                  <div><span className="font-semibold">City:</span> {selected?.customer?.city}</div>
                  <div><span className="font-semibold">Address:</span> {selected?.customer?.address}</div>
                  {selected?.customer?.notes ? (
                    <div className="mt-2">
                      <span className="font-semibold">Notes:</span> {selected.customer.notes}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="font-bold text-gray-900">Order</div>
                <div className="text-sm text-gray-700 mt-2 space-y-1">
                  <div><span className="font-semibold">Payment:</span> {selected.paymentMethod}</div>
                  <div><span className="font-semibold">Delivery:</span> {selected.deliveryType} (Rs {money(selected.deliveryFee)})</div>
                  <div><span className="font-semibold">Subtotal:</span> Rs {money(selected.subtotal)}</div>
                  <div><span className="font-semibold">Total:</span> Rs {money(selected.total)}</div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700">Update status</label>
                  <select
                    value={selected.status}
                    disabled={updating}
                    onChange={(e) => updateStatus(selected._id, e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                  {updating && (
                    <div className="text-xs text-gray-500 mt-2">Updating...</div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-5 pb-6">
              <div className="font-bold text-gray-900 mb-3">Items</div>
              <div className="space-y-3">
                {selected.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4">
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

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
