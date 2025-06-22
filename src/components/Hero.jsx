import React from 'react';
import '../styles/hero.css';
import image from '../assets/gymcarousel.webp';

const Hero = () => {
  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    position: 'relative',
  };

  return (
    <section className="hero-section text-white text-center d-flex align-items-center " style={backgroundStyle}>
      <div className="overlay"></div>
      <div className="container hero-content">
        <h1 className="display-3 fw-bold text-uppercase mb-3">Unleash Your Beast</h1>
        <p className="lead mb-4">Engineered for performance. Designed for style.</p>
        <a href="#shop" className="btn btn-danger btn-lg px-5 py-2">Shop Now</a>
      </div>
    </section>
  );
};

export default Hero;

