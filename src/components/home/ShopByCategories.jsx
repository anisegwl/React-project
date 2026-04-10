import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men's Apparel",
    path: "/men-products",
    image: "https://images.unsplash.com/photo-1581009137142-62cf9b33a215?w=500&q=80",
  },
  {
    name: "Women's Apparel",
    path: "/women-products",
    image: "https://images.unsplash.com/photo-1608228088998-57828365d486?w=500&q=80",
  },
  {
    name: "Supplements",
    path: "/supplements",
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&q=80",
  },
  {
    name: "Accessories",
    path: "/accsessories",
    image: "https://images.unsplash.com/photo-1584735175315-9d5823ea25e5?w=500&q=80",
  },
];

const ShopByCategories = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Shop by Category</h2>
            <p className="mt-2 text-lg text-gray-500">Find exactly what you need to crush your goals.</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              to={category.path}
              className="group relative block overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 shadow-sm transition-all hover:shadow-xl"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:from-black/90" />

              {/* Text */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <span className="text-sm font-semibold text-white/0 group-hover:text-white/100 transition-colors duration-300">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategories;
