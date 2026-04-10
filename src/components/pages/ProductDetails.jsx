import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductContext from "../../context/product/ProductContext";
import WishlistContext from "../../context/wishlist/WishlistContext";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const FALLBACK_IMG = "https://via.placeholder.com/600x600.png?text=No+Image";

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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, cart, getAllProducts, products } = useContext(ProductContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState("");

  const inCartQty = useMemo(() => {
    const found = (cart || []).find((c) => c._id === id);
    return found ? Number(found.qty || 1) : 0;
  }, [cart, id]);

  const inWishlist = useMemo(() => {
    return (wishlist || []).some((w) => w?._id === id);
  }, [wishlist, id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      const all = await res.json();
      const found = (all || []).find((p) => p._id === id);

      if (!found) {
        setProduct(null);
      } else {
        setProduct(found);
        setActiveImg(resolveImage(found));
        // preload related products list if not present
        if (!products || products.length === 0) {
          getAllProducts("");
        }
      }
    } catch (e) {
      console.error(e);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const price = Number(product?.price || 0);
  const discount = Number(product?.discount || 0);
  const finalPrice = Math.max(price - discount, 0);
  const stock = Number(product?.instock || 0);

  const related = useMemo(() => {
    if (!product?.category || !Array.isArray(products)) return [];
    return products
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 8);
  }, [products, product]);

  const handleAdd = () => {
    if (!product) return;
    if (stock <= 0) {
      toast.error("❌ Out of stock");
      return;
    }
    const success = addToCart(product, q);
    if (success) {
      toast.success("✅ Added to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-6xl mx-auto bg-white border rounded-2xl p-6">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-6xl mx-auto bg-white border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="text-gray-600 mt-2">
            This product may have been removed or the link is incorrect.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  // Build image list (supports array/string)
  const images = Array.isArray(product.image)
    ? product.image
        .filter(Boolean)
        .map((x) => (x.startsWith("http") ? x : x.startsWith("/uploads/") ? `${API_BASE}${x}` : `${API_BASE}/uploads/${x}`))
    : product.image
    ? [resolveImage(product)]
    : [FALLBACK_IMG];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          ← Back
        </button>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Images */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
              <img
                src={activeImg || resolveImage(product)}
                alt={product.title}
                className="w-full h-[420px] object-cover"
                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
              />
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImg(src)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border ${
                      (activeImg || resolveImage(product)) === src
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                    title="View image"
                  >
                    <img
                      src={src}
                      alt="thumb"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="text-sm font-semibold text-gray-500">
                Category: <span className="text-gray-800">{product.category}</span>
              </div>
              <button
                type="button"
                onClick={() => inWishlist ? removeFromWishlist(id) : addToWishlist(product)}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-pink-500 transition-colors"
                title="Toggle Wishlist"
              >
                {inWishlist ? <FaHeart className="text-pink-500 text-lg" /> : <FaRegHeart className="text-lg" />}
                <span className="hidden sm:inline">{inWishlist ? "Saved" : "Save"}</span>
              </button>
            </div>

            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="mt-3 text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-5 flex items-end gap-3">
              <div className="text-3xl font-extrabold text-gray-900">
                Rs {money(finalPrice)}
              </div>

              {discount > 0 && (
                <>
                  <div className="text-lg text-gray-500 line-through">
                    Rs {money(price)}
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    Save Rs {money(discount)}
                  </div>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="mt-4">
              {stock > 0 ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm font-semibold">
                  In stock: {stock}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 px-3 py-1 text-sm font-semibold">
                  Out of stock
                </div>
              )}
            </div>

            {/* Qty + Add */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex items-center gap-2">
                <button
                  className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setQty((q) => Math.max(1, Number(q) - 1))}
                  disabled={stock <= 0}
                >
                  -
                </button>
                <input
                  value={qty}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    setQty(v === "" ? "" : Math.max(1, Math.min(Number(v), stock || 999)));
                  }}
                  className="w-20 h-10 rounded-xl border border-gray-200 text-center font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setQty((q) => Math.min(stock || 999, Number(q || 1) + 1))}
                  disabled={stock <= 0}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={stock <= 0}
                className="flex-1 rounded-xl bg-gray-900 text-white py-3 font-semibold hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Add to cart
              </button>

              <Link
                to="/cartitems"
                className="sm:w-[180px] text-center rounded-xl border border-gray-200 py-3 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Go to cart
              </Link>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">Related products</h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map((p) => {
                const fp = Math.max(Number(p.price || 0) - Number(p.discount || 0), 0);
                return (
                  <Link
                    to={`/product/${p._id}`}
                    key={p._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src={resolveImage(p)}
                      alt={p.title}
                      className="w-full h-44 object-cover bg-gray-100"
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                    />
                    <div className="p-4">
                      <div className="font-semibold text-gray-900 line-clamp-2">
                        {p.title}
                      </div>
                      <div className="mt-2 font-bold text-gray-900">
                        Rs {money(fp)}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
