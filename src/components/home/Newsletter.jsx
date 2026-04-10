import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("🎉 You're in! Check your email for your 10% discount.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Join the Club</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Sign up to get the latest on sales, new releases, and get <span className="text-white font-bold">10% off</span> your first order.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-5 py-4 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/30 transition-shadow bg-white"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors whitespace-nowrap active:scale-95"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4">We respect your privacy. No spam, ever.</p>
      </div>
    </section>
  );
};

export default Newsletter;
