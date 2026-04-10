import { useEffect, useMemo, useState, useContext } from "react";
import ProductContext from "../../../context/product/ProductContext";
import UserProductCard from "../../common/ProductCard";
import { toast } from "react-toastify";

const CategoryProductsPage = ({
  category = "",
  title = "Products",
  subtitle = "",
  searchPlaceholder = "Search products...",
}) => {
  const {
    products,
    getAllProducts,
    loadingProducts,
    errorProducts,
    addToCart,
  } = useContext(ProductContext);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | priceLow | priceHigh | nameAZ | nameZA

  useEffect(() => {
    getAllProducts("", category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = Array.isArray(products) ? [...products] : [];

    if (q) {
      list = list.filter((p) => {
        const name = (p?.name || p?.title || "").toLowerCase();
        const brand = (p?.brand || "").toLowerCase();
        const desc = (p?.description || "").toLowerCase();
        return name.includes(q) || brand.includes(q) || desc.includes(q);
      });
    }

    const getPrice = (p) => {
      const val = p?.price ?? p?.sellingPrice ?? p?.discountPrice ?? 0;
      const num = Number(val);
      return Number.isFinite(num) ? num : 0;
    };

    switch (sortBy) {
      case "priceLow":
        list.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "priceHigh":
        list.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "nameAZ":
        list.sort((a, b) =>
          (a?.name || a?.title || "").localeCompare(b?.name || b?.title || "")
        );
        break;
      case "nameZA":
        list.sort((a, b) =>
          (b?.name || b?.title || "").localeCompare(a?.name || a?.title || "")
        );
        break;
      default:
        break;
    }

    return list;
  }, [products, query, sortBy]);

  const handleAddToCart = (item) => {
    const success = addToCart(item, 1);
    if (success) {
      toast.success("✅ Added to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-white/80 max-w-2xl">{subtitle}</p>
          ) : null}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3">
              <label className="text-sm text-white/80">Search</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="mt-2 w-full bg-transparent text-white placeholder-white/50 outline-none"
              />
            </div>

            {/* Sort */}
            <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3">
              <label className="text-sm text-white/80">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-2 w-full bg-transparent text-white outline-none"
              >
                <option value="newest" className="text-black">
                  Newest
                </option>
                <option value="priceLow" className="text-black">
                  Price: Low to High
                </option>
                <option value="priceHigh" className="text-black">
                  Price: High to Low
                </option>
                <option value="nameAZ" className="text-black">
                  Name: A to Z
                </option>
                <option value="nameZA" className="text-black">
                  Name: Z to A
                </option>
              </select>
            </div>

            {/* Count */}
            <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 flex flex-col justify-center">
              <div className="text-sm text-white/80">Showing</div>
              <div className="text-xl font-semibold">
                {filteredProducts.length} items
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {errorProducts && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            ❌ {errorProducts}
          </div>
        )}

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-pulse"
              >
                <div className="h-40 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
                <div className="h-10 bg-gray-200 rounded mt-4" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              No products found
            </h3>
            <p className="text-gray-600 mt-2">
              Try searching with a different keyword or clear your filter.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div key={item._id} className="h-full">
                <UserProductCard item={item} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
