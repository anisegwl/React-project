import React, { useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";
import "../styles/product.css";

const About = () => {
  const {
    state: { products, cart },
    dispatch,
    fetchUser
  } = useContext(ProductContext);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container my-4">
      <h3 className="mt-3 mb-4 text-center" style={{ fontSize: "40px", color: "grey" }}>
        <b>Our Products</b>
      </h3>
      <div className="row">
        {products.map(prod => {
          const inCart = cart.some(item => item._id === prod._id);
          return (
            <div key={prod._id} className="col-md-3 mb-4">
              <div className="our-card">
                <img src={prod.img} alt={prod.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{prod.title}</h5>
                  <p className="card-text">{prod.description}</p>
                  <div className="discount-para" style={{ display: "flex", gap: "15px" }}>
                    <p className="our-price" style={{ color: "red" }}>
                      <s>Rs {prod.price}</s>
                    </p>
                    <p className="our-price">Rs {prod.discountPrice}</p>
                    {inCart ? (
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() =>
                          dispatch({ type: "REMOVE_FROM_CART", payload: prod })
                        }
                      >
                        Remove from cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() =>
                          dispatch({ type: "ADD_TO_CART", payload: prod })
                        }
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                  <p className="our-stock">
                    {prod.instock > 0 ? `${prod.instock} in stock` : "Out of stock"}
                  </p>
                  <div className="buttons">
                    <button
                      className="btn-gradient"
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: prod })
                      }
                    >
                      Buy Now
                    </button>
                    {/* removed the duplicate Add to Cart here */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
