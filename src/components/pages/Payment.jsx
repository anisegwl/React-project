import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
 import { ToastContainer, toast } from 'react-toastify';

import image1 from "../../assets/esewa.webp";
import image2 from "../../assets/khalti.webp";
import image3 from "../../assets/cod.webp";
import image4 from "../../assets/card.jpg";

const Payment = () => {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const paymentOption = [
    { id: 1, name: "Esewa", image: image1 },
    { id: 2, name: "Khalti", image: image2 },
    { id: 3, name: "Cash On Delivery", image: image3 },
    { id: 4, name: "Card", image: image4 }
  ];

  const handleCheckout = () => {
    if (selectedId) {
      navigate("/checkout");
    } else {
      toast.error('Please Select The Payment Method', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
    }
  };

  return (
    <section className='payment-section '>
      <div className='container d-flex flex-column justify-content-center align-items-center mt-5 mb-5'>
        <h2>Payment Options</h2>
        {paymentOption.map((item) => (
          <div key={item.id} className="payment-card card m-3 p-3">
            <div className='card-body d-flex justify-content-between align-items-center' style={{ width: '22rem' }}>
              <div className="d-flex align-items-center">
                <img src={item.image} alt={item.name} className="payment-img me-3" />
                <h5 className="card-title mb-0">{item.name}</h5>
              </div>
              <input
                style={{
                  width: "20px",
                  height: "20px",
                }}
                type='checkbox'
                checked={selectedId === item.id}
                onChange={() => setSelectedId(item.id)}
              />
            </div>
          </div>
        ))}

        <div className='payment-buttons mt-4'>
          <Link to="/cartitems" >
            <button>
              <IoIosArrowRoundBack size={20} /> Back
            </button>
          </Link>
          <button
            className="btn btn-success"
            onClick={handleCheckout}
          >
            Checkout <FaArrowRightLong size={16} />
          </button>
        </div>
        <ToastContainer/>
      </div>
    </section>
    
  );
};

export default Payment;
