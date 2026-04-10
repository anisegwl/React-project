import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  { name: "Sarah Johnson", role: "Fitness Enthusiast", review: "The quality of their workout gear is outstanding! The fabric is breathable and perfect for intense training.", rating: 5, avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Michael Chen", role: "Professional Athlete", review: "These products deliver every single time. Highly recommended for anyone serious about fitness!", rating: 5, avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Emma Williams", role: "Yoga Instructor", review: "I love how comfortable and stylish everything is. Best investment I've made!", rating: 5, avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "David Rodriguez", role: "CrossFit Coach", review: "Excellent durability and design. The customer service is also top-notch!", rating: 4, avatar: "https://i.pravatar.cc/150?img=13" },
  { name: "Lisa Thompson", role: "Marathon Runner", review: "Finally found gear that doesn't chafe during long runs! The fit is perfect.", rating: 5, avatar: "https://i.pravatar.cc/150?img=9" },
  { name: "James Carter", role: "Powerlifter", review: "Unbelievable support and stretch. Built to last through the heaviest squats.", rating: 5, avatar: "https://i.pravatar.cc/150?img=11" },
];

const Testimonials = () => {
  const renderStars = (rating) => (
    <div className="flex gap-1 text-yellow-400 text-sm">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i >= rating ? "text-gray-300" : ""} />
      ))}
    </div>
  );

  const TestimonialCard = ({ t }) => (
    <div className="w-80 flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mx-3 hover:shadow-md transition-shadow">
      {renderStars(t.rating)}
      <p className="text-gray-700 mt-4 mb-6 leading-relaxed line-clamp-3">"{t.review}"</p>
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
          <span className="text-xs text-blue-600 font-semibold">{t.role}</span>
        </div>
      </div>
    </div>
  );

  // Split into two rows for the staggered marquee effect
  const row1 = [...testimonials].slice(0, 3);
  const row2 = [...testimonials].slice(3, 6);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">Don't just take our word for it</h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Join thousands of athletes pushing their limits in our gear.
        </p>
      </div>

      {/* Row 1 -> Scroll Left */}
      <div className="relative flex overflow-x-hidden group mb-6">
        <div className="animate-marquee-left flex flex-nowrap">
          {[...row1, ...row1, ...row1, ...row1].map((t, idx) => (
            <TestimonialCard key={`r1-${idx}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 -> Scroll Right */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee-right flex flex-nowrap">
          {[...row2, ...row2, ...row2, ...row2].map((t, idx) => (
            <TestimonialCard key={`r2-${idx}`} t={t} />
          ))}
        </div>
      </div>

      <style>{`
        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
        .group:hover .animate-marquee-left,
        .group:hover .animate-marquee-right {
          animation-play-state: paused;
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
