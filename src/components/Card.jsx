import React, { useEffect, useState } from "react";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 5);
  };

  const handleDecrement = () => {
    setCount(count - 5);
  };
  const handleMultiplication = () => {
    setCount(count * 5);
  };
  const handleChangeName = () => {
    setName("Sagar");
  };

  return (
    <>
      <div className={`container  bg-${props.mode}  mt-5`}>
        <div className="row">
          <div className="col-md-4">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;