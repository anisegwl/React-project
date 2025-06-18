import React from 'react';
import specialEdition from '../assets/empty-gym.webp';
import '../styles/card.css';

const Card = () => {
  return (
    <div className="card container mt-5 mb-5">
      <div className="row">
        {/* Left: Text Section */}
        <div className="first-col col-md-6 d-flex align-items-center" style={{ minHeight: 400 }}>
          <div className="p-5">
            <h2 className="fw-bold mb-3"> Our Impact </h2>
            <p className="mb-4 text-secondary" style={{ fontSize: '1.15rem' }}>
              Everything we do is built around performance, purpose, and progress. We empower people to train harder, live healthier, and reach their full potential backed by quality gear and clean supplements that make real impact.
            </p>
            <button className="btn btn-dark px-4 py-2 fw-bold">
              Learn More <span className="ms-2">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="second-col col-md-6 p-0">
          <div
            style={{
              width: '100%',
              height: '100%',
              minHeight: 400,
            }}
          >
            <img
              src={specialEdition}
              alt="Model wearing puffer jacket"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
