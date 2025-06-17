import React from 'react';
import specialEdition from '../assets/special.jpg'

const SpecialEditionBanner = () => (
  <div className="container">
    <div className="row">
      
      <div className="col-md-6" style={{ background: '#eaf6fd' }}>
        <div
          className="h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 400,
          }}
        >
          {/* Overlayed model image */}
          <img
            src={specialEdition}
            alt="Model wearing puffer jacket"
            className="img-fluid mb-4 mt-4"
            style={{
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
      {/* Right: Text Section */}
      <div className="col-md-6 d-flex align-items-center" style={{ background: '#eaf6fd', minHeight: 400 }}>
        <div className="p-5">
          <h2 className="fw-bold mb-3">Special Edition</h2>
          <p className="mb-4 text-secondary" style={{ fontSize: '1.15rem' }}>
            Our classic puffer, reimagined. The Epiq SE offers a sleek triple black look and buttery soft outer fabric, made using recycled plastic waste, including end-of-life tyres.
          </p>
          <button className="btn btn-dark px-4 py-2 fw-bold">
            Learn More <span className="ms-2">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SpecialEditionBanner;
