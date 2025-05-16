import React, { useContext } from "react";
import productContext from "../context/ProductContext";
import "../styles/cartitems.css"

import { MdDelete } from "react-icons/md";

const CartItems = () => {


  const context = useContext(productContext);
  const {
    state: { cart },
    dispatch,
  } = context;
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  //   console.log("this is cart item cart", cart);

  return (
    <div className="container">
      <h4>Your Cart</h4>

      <div className="product-container">
        <ul>
          {cart &&
            cart.map(item => {
              return (
                <li key={item._id}>
                  <div className="row">
                    <div className="col-md-2 mt-3">
                      <img
                        src={item.img}
                        style={{
                          height: "100px",
                          width: "100px",
                          marginTop: "10px"
                        }}
                        alt="cart image"
                      />
                    </div>
                    <div className="col-md-2 ">
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                    <div className="col-md-2 mt-4">
                      <h5>Price: Rs {item.price}</h5>
                    </div>
                    <div className="col-md-2 mt-4">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_CART_ITEM",
                            payload: { _id: item._id, qty: e.target.value },
                          })
                        }
                        className="form-control"
                      >
                        {[...Array(item.instock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-danger mt-4"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: item,
                          })
                        }
                      >
                        <MdDelete />
                      </button>
                      <div className="product-total">
                        <p>Total : {item.price * item.qty}</p>
                      </div>

                    </div>
                  </div>
                </li>
              );
            })}
            </ul>
            </div>
          <div className="last-container">
            Grand Total: Rs {grandTotal}
          <hr></hr>
          <div className="button-checkout"><button className="btn btn-success">Checkout</button></div>
          </div>
    </div>
  );
};

export default CartItems;