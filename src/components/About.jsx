import React, { useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";
import "../styles/product.css";
import News from "./News";


const About = () => {
  const {
    state: { products, cart },
    dispatch,
    articles,
    fetchData,
  } = useContext(ProductContext);

  console.log(articles)

  useEffect(() => {
    fetchData();
  }, []);

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
                    
                  </div>
                  <p className="our-stock">
                    {prod.instock > 0 ? `${prod.instock} in stock` : "Out of stock"}
                  </p>
                  <div className="buttons">
                    {inCart ? (
                      <button
                        className="btn-removeCart mx-2"
                        onClick={() =>
                          dispatch({ type: "REMOVE_FROM_CART", payload: prod })
                        }
                      >
                        Remove from cart
                      </button>
                    ) : (
                      <button
                        className="btn-gradient btn-primary mx-2" style={{height:"30px" }}
                        onClick={() =>
                          dispatch({ type: "ADD_TO_CART", payload: prod })
                        }
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <News articles={articles}/>
      </div>
    </div>
  );
};

export default About;
