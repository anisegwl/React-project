import React, { useContext } from "react";
import { Link } from "react-router-dom";
import WishlistContext from "../../context/wishlist/WishlistContext";
import ProductCard from "../common/ProductCard";

const Wishlist = () => {
  const { wishlist, loading } = useContext(WishlistContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium text-lg animate-pulse">Loading your wishlist...</p>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-md w-full">
          <div className="text-4xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-900">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mt-2">Save items you love so you won't lose track of them.</p>
          <Link
            to="/"
            className="inline-block mt-8 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
