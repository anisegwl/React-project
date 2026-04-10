import React from "react";
import { FaShippingFast, FaLock, FaUndo, FaHeadset } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaShippingFast className="text-4xl text-gray-900" />,
      title: "Free Shipping",
      description: "On all orders above Rs 5,000",
    },
    {
      icon: <FaLock className="text-4xl text-gray-900" />,
      title: "Secure Checkout",
      description: "100% secure payment gateway",
    },
    {
      icon: <FaUndo className="text-4xl text-gray-900" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <FaHeadset className="text-4xl text-gray-900" />,
      title: "24/7 Support",
      description: "Dedicated support anytime",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
              <p className="text-base text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
