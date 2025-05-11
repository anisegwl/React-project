import React, { useContext } from "react";
import Card from "./card";
import productContext from "../context/ProductContext";
import img from "../assets/img.jpg";

const About = () => {
  const { title, price, description } = useContext(productContext);
  return (
    <div className="container">
      <div className="row">
        <h4>About page — product: {title}</h4>
        <div className="col-md-4">
          <div className="card">
            <img src={img} className="card-img-top" alt={title} />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p><strong>Price:</strong> Rs {price}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <Card />
      </div>
    </div>
  );
};

export default About;
