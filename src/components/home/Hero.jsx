import React, { useState } from 'react';
import image from '../../assets/gymcarousel.webp';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  // Preload image for better UX
  React.useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.error('Failed to load hero background image');
      setImageError(true);
    };
  }, []);

  const handleShopClick = (e) => {
    try {
      // Smooth scroll to shop section
      const shopSection = document.querySelector('#shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Shop section not found');
      }
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white text-center bg-gray-900"
      style={{
        backgroundImage: imageError ? 'none' : `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-10">
          <p className="text-sm">Failed to load background image</p>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase mb-4 tracking-tight">
          Unleash Your Beast
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Engineered for performance. Designed for style.
        </p>
        <a 
          href="#shop" 
          onClick={handleShopClick}
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Hero;