import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrophy, FaStar, FaShippingFast } from 'react-icons/fa';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    { icon: <FaTrophy />, text: "World #1 Gym Wear Brand" },
    { icon: <FaShippingFast />, text: "Free Shipping on Orders Over Rs 2000" },
    { icon: <FaStar />, text: "Use Code: FIRSTBUY for 10% Off" }
  ];

  // Rotate messages every 5 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, messages.length]);

  const handleClose = () => {
    try {
      setIsVisible(false);
      // Store in sessionStorage so it stays hidden for the session
      sessionStorage.setItem('topBannerClosed', 'true');
    } catch (error) {
      console.error('Error closing banner:', error);
    }
  };

  // Check if banner was previously closed
  useEffect(() => {
    try {
      const wasClosed = sessionStorage.getItem('topBannerClosed');
      if (wasClosed === 'true') {
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error reading session storage:', error);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-1">
        <div className="flex items-center justify-center gap-3">
          {/* Icon with animation */}
          <div className="hidden sm:flex items-center justify-center ">
            {messages[currentMessage].icon}
          </div>

          {/* Message with fade transition */}
          <p className="text-sm md:text-base font-semibold text-center transition-all duration-500">
            {messages[currentMessage].text}
          </p>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 p-1.5 rounded-full transition-colors duration-200"
            aria-label="Close banner"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 mt-1">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentMessage
                  ? 'w-6 bg-white'
                  : 'w-1 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;