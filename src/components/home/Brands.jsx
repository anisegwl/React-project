import React from "react";

const Brands = () => {
  const brands = [
    "VOGUE",
    "GQ",
    "MEN'S HEALTH",
    "FORBES",
    "GYMSHARK",
    "MYPROTEIN",
    "NIKE",
    "ADIDAS",
  ];

  return (
    <div className="bg-black py-6 overflow-hidden flex flex-col justify-center">
      <div className="relative flex overflow-x-hidden group whitespace-nowrap">
        <div className="animate-marquee flex space-x-12 items-center flex-nowrap">
          {brands.map((brand, idx) => (
            <span key={idx} className="text-gray-400 text-2xl font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity cursor-pointer mx-4">
              {brand}
            </span>
          ))}
          {brands.map((brand, idx) => (
            <span key={`dup-${idx}`} className="text-gray-400 text-2xl font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity cursor-pointer mx-4">
              {brand}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Brands;
