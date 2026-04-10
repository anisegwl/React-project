import React, { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    instock: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData({
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price ?? "",
      discount: product?.discount ?? 0,
      instock: product?.instock ?? "",
    });
    setError("");
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target; // ✅ fixed
    setFormData((p) => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      discount: Number(formData.discount || 0),
      instock: Number(formData.instock),
    };

    if (!payload.title) return setError("Title is required");
    if (!payload.description) return setError("Description is required");
    if (!Number.isFinite(payload.price) || payload.price <= 0)
      return setError("Price must be greater than 0");
    if (!Number.isFinite(payload.discount) || payload.discount < 0)
      return setError("Discount cannot be negative");
    if (!Number.isFinite(payload.instock) || payload.instock < 0)
      return setError("Stock must be 0 or greater");

    try {
      setSaving(true);
      await onSave(payload); // should throw on error
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  // close on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              Edit Product
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Update title, pricing and stock.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Product Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={saving}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                placeholder="e.g. Whey Protein 1kg"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={saving}
                rows={4}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                placeholder="Short description..."
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Price (Rs)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={saving}
                min="0"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                placeholder="0"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Discount (Rs)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                disabled={saving}
                min="0"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-2">
                This is amount off (not %).
              </p>
            </div>

            {/* Stock */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="instock"
                value={formData.instock}
                onChange={handleChange}
                disabled={saving}
                min="0"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                placeholder="0"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col-reverse md:flex-row md:items-center md:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-black transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <FaSave />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
