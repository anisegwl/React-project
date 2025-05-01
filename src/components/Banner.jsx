import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css';
import image1 from "../assets/image1.webp"
import image2 from "../assets/image2.webp"

export default () => {
  return (
    <Splide
    options={{
      rewind: true,
      gap: '1rem',
      width: '100%',
    }}
    aria-label="My Favorite Images"
  >
    <SplideSlide>
      <img src={image1} alt="Image 1" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
    </SplideSlide>
    <SplideSlide>
      <img src={image2} alt="Image 2" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
    </SplideSlide>
    <SplideSlide>
      <img src="image3.jpg" alt="Image 3" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
    </SplideSlide>
  </Splide>
);
}