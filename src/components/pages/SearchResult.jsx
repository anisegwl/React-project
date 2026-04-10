import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../../context/product/ProductContext";
import ProductCard from "../common/ProductCard";
import { toast } from "react-toastify";

const SearchResult = () => {
  const { searchQuery } = useParams();
  const { products, getAllProducts, loadingProducts, errorProducts, addToCart } = useContext(ProductContext);

  useEffect(() => {
    if (searchQuery) {
      getAllProducts(searchQuery);
    }
  }, [searchQuery]);

  const handleAddToCart = (item) => {
    const success = addToCart(item, 1);
    if (success) {
      toast.success("✅ Added to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Search Results for "{searchQuery}"
        </h2>
        
        {loadingProducts ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 font-medium">Searching products...</p>
          </div>
        ) : errorProducts ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100">
            {errorProducts}
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item._id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-2">
              We couldn't find anything matching "{searchQuery}". Try different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;