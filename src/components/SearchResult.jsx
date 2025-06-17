import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import productContext from "../context/productContext";
import dog from "../assets/card.jpg";

const Searchresult = () => {
  const { searchQuery } = useParams();
  const context = useContext(productContext);
  const {
    state: { cart },
    allProduct,
    product,
    dispatch,
  } = context;

  useEffect(() => {
    allProduct(searchQuery);
  }, [searchQuery]);

  return (
    <div className="container">
      <div className="row">
        <h4 className="our-product-title">Search Product</h4>
        {product?.length > 0 ? (
          product.map((item) => (
            <div className="col-md-3" key={item._id}>
              <div className="card">
                <img
                  src={
                    item.image?.[0]
                      ? `http://localhost:5000/uploads/${item.image[0]}`
                      : dog
                  }
                  className="card-img-top"
                  alt="product"
                />
                <div className="card-body">
                  <b>{item.title}</b>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Rs. {item.price}</p>
                  {cart && cart.some((p) => p._id === item._id) ? (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item })
                      }
                    >
                      Remove from cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: item })
                      }
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Searchresult;