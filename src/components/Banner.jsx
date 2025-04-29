import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css';


export default () => {
  return (
    <Splide
      options={ {
        rewind: true,
        gap   : '1rem',
      } }
      aria-label="My Favorite Images"
    >
      <SplideSlide>
        <img src="{image1}" alt="Image 1"/>
      </SplideSlide>
      <SplideSlide>
        <img src="image2.jpg" alt="Image 2"/>
      </SplideSlide>
      <SplideSlide>
        <img src="image3.jpg" alt="Image 3"/>
      </SplideSlide>
    </Splide>
  );
}