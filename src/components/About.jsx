import React, { useContext, useEffect } from 'react';
import ProductContext from '../context/ProductContext';
import '../styles/product.css';

const About = () => {
  const { state :{cart, products},dispatch, fetchUser } = useContext(ProductContext);
  console.log("our product from reducer state",products);
  console.log("cart from reducer state",cart);
  

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container my-4">
      <h3 className="mt-3 mb-4 text-center " style={{ fontSize : '40px',color: 'grey'}}><b>Our Products</b></h3>
      <div className="row">
        {products && products.map(prod => (
          <div key={prod._id} className="col-md-3 mb-4">
            <div className="our-card">
              <img
                src={prod.img}
                alt={prod.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{prod.title}</h5>
                <p className="card-text">{prod.description}</p>
                <div className='discount-para' style={{display: 'flex', gap:'15px'}}>
                <p className="our-price" style ={{color :'red'}}><s>Rs {prod.price}</s></p>
                <p className="our-price">Rs {prod.discountPrice}</p>
                {cart && cart.some((p)=>p._id === prod._id )? (
                  <button className='btn btn-danger mx-2'>
                    Remove from cart
                  </button>
                ):(
                  <button onClick={()=>{
                    dispatch()
                    dispatch({type: 'ADD_TO_CART',
                    payload: prod})
                    }}className='btn btn-primary mx-2'>
                    Add from Cart
                  </button>
                )}
                </div>
                <p className="our-stock">
                  {prod.instock > 0
                    ? `${prod.instock} in stock`
                    : 'Out of stock'}
                </p>
                <div className="buttons">
                  <button className="btn-gradient">
                    Buy Now
                  </button>
                  <button
                    className="btn-outline-green"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
