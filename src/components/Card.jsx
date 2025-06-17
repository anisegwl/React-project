import React from 'react'
import specialEdition from '../assets/empty-gym.webp'
import '../styles/card.css'

const Card = () => {
  return (
 <div className="card container mt-5 mb-5">
     <div className="row">
       <div className=" first-col col-md-6 d-flex align-items-center" style={{ minHeight: 400 }}>
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
       
       {/* Right: Text Section */}
       <div className="second-col col-md-6" >
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
       
     </div>
   </div>
);
}

export default Card
