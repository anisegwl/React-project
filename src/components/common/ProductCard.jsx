import React, { useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../context/product/ProductContext";
import WishlistContext from "../../context/wishlist/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FALLBACK_IMG = "https://via.placeholder.com/600x600.png?text=No+Image";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

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

const ProductCard = ({ item, onAddToCart }) => {
  const { cart, removeFromCart } = useContext(ProductContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const title = item?.title || item?.name || "Product";
  const description = item?.description || "";
  const stock = Number(item?.instock ?? item?.stock ?? 0);

  const pricing = useMemo(() => {
    const price = Number(item?.price ?? 0);
    const discount = Number(item?.discount ?? 0);
    const finalPrice = Math.max(price - discount, 0);
    const hasDiscount = discount > 0 && price > finalPrice;
    const pct = price > 0 ? Math.round((discount / price) * 100) : 0;
    return { price, discount, finalPrice, hasDiscount, pct };
  }, [item]);

  const productId = item?._id;

  const inCart = useMemo(() => {
    return (cart || []).some((c) => c?._id === productId);
  }, [cart, productId]);

  const inWishlist = useMemo(() => {
    return (wishlist || []).some((w) => w?._id === productId);
  }, [wishlist, productId]);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <div className="relative group w-full rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      {/* Clickable area -> Product Details */}
      <Link to={productId ? `/product/${productId}` : "#"} className="block">
        <div className="relative">
          <img
            src={resolveImage(item)}
            alt={title}
            className="h-56 w-full object-cover bg-gray-100"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          />

          {pricing.hasDiscount && (
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-black/85 px-3 py-1 text-xs font-semibold text-white">
                -{pricing.pct}% OFF
              </span>
            </div>
          )}

          <div className="absolute top-3 right-12 z-10">
            {stock > 0 ? (
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 border border-gray-200 shadow-sm">
                In stock
              </span>
            ) : (
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                Out of stock
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[40px]">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {description || "No description available"}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                {pricing.hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    Rs {money(pricing.price)}
                  </span>
                )}
                <span className="text-lg font-bold text-gray-900">
                  Rs {money(pricing.finalPrice)}
                </span>
              </div>

              {pricing.hasDiscount && (
                <div className="text-xs font-medium text-green-600 mt-1">
                  Save Rs {money(pricing.discount)}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            {stock > 0 ? `${stock} available` : "Currently unavailable"}
          </div>
        </div>
      </Link>

      {/* Button area */}
      <div className="px-4 pb-4">
        {inCart ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeFromCart(productId);
            }}
            className="w-full rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 active:scale-95 transition"
          >
            Remove from cart
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart?.(item); // your parent can call addToCart(item, 1)
            }}
            disabled={stock <= 0}
            className="w-full rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to cart
          </button>
        )}
      </div>

      {/* Floating Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-pink-500 hover:scale-110 active:scale-95 transition-all"
      >
        {inWishlist ? <FaHeart size={16} /> : <FaRegHeart size={16} className="text-gray-400 hover:text-pink-500" />}
      </button>

    </div>
  );
};

export default ProductCard;
