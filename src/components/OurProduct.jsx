import React, { useContext, useEffect } from "react";
import ProductContext from "../context/product/ProductContext";
import ProductCard from "./common/ProductCard";

const OurProduct = () => {
  const { products, getAllProducts, addToCart } =
    useContext(ProductContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mx-auto my-8 px-4">
      <h3 className="mb-8 text-center text-2xl font-bold">
        Our Products
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((item) => (
          <ProductCard
            key={item._id}
            item={item}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default OurProduct;
