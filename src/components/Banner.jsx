// SplideCarousel.jsx
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import '@splidejs/splide/css/skyblue';
import "../styles/Carousel.css"
import image1 from '../assets/carousel1.jpg';
import image2 from '../assets/carousel2.jpg';
import image3 from '../assets/carousel3.jpg';
import image4 from '../assets/carousel4.jpg';


const SplideCarousel = () => (
  <Splide
    options={{
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '1rem',
      autoplay: true,
      interval: 3000,
      pauseOnHover: true,
      pagination: false,
      arrows: true,
      breakpoints: {
        992: { perPage: 2 },
        768: { perPage: 1 },
      },
    }}
    aria-label="Demo Splide Carousel"
    className="my-splide"
  >
    
    <SplideSlide className= 'mt-5 mb-5'>
      <div className="slide-card ">
        <img src={image1} alt="Slide 1" />
      </div>
    </SplideSlide>
    <SplideSlide className= 'mt-5'>
      <div className="slide-card">
        <img src={image2} alt="Slide 2" />
      </div>
    </SplideSlide>
    <SplideSlide className= 'mt-5'>
      <div className="slide-card">
        <img src={image3} alt="Slide 3" style={{height :'328px'}} />

      </div>
    </SplideSlide>
    <SplideSlide className= 'mt-5'>
      <div className="slide-card">
        <img src={image4} alt="Slide 4" />

      </div>
    </SplideSlide>
  </Splide>
);

export default SplideCarousel;
