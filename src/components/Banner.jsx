import React from 'react';
import image1 from "../assets/carousel1.png"
import image2 from "../assets/carousel2.png"
import image3 from "../assets/carousel3.png"
import '../styles/Carousel.css'; 

export default function Banner() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade custom-carousel mt-5" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={image1} className="d-block" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={image2} className="d-block" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={image3} className="d-block" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

  );
}
