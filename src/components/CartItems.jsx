import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import "../styles/cartitems.css";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import defaultImage from "../assets/cod.jpg";

const CartItems = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [promoInput, setPromoInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const shipping = 89;

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const applyPromoCode = () => {
    if (promoInput.toUpperCase() === "FIRSTBUY") {
      setDiscount(0.1);
      toast.success("10% Discount applied");
    } else {
      setDiscount(0);
      toast.error("Invalid promo code");
    }
  };

  const discountedTotal = subtotal - subtotal * discount;
  const finalTotal = (discount > 0 ? discountedTotal : subtotal) + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <h4>Your Cart</h4>
        <div className="product-container">
          <ul>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <li key={item.product._id}>
                  <div className="row">
                    <div className="col-md-2 mt-3">
                      <img
                        src={
                          item.product.image && item.product.image[0]
                            ? `http://localhost:5000/uploads/${item.product.image[0]}`
                            : defaultImage
                        }
                        className="card-img-top"
                        alt={item.product.title}
                      />
                    </div>
                    <div className="col-md-2">
                      <h5>{item.product.title}</h5>
                      <p>{item.product.description}</p>
                    </div>
                    <div className="col-md-2 mt-4">
                      <h5>Price: Rs {item.product.price}</h5>
                    </div>
                    <div className="col-md-2 mt-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          addToCart(item.product._id, Number(e.target.value));
                        }}
                        className="form-control"
                      >
                        {[...Array(item.product.instock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn btn-danger mt-4"
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        <MdDelete />
                      </button>
                      <div className="product-total">
                        <p>Total : Rs {item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="row mt-4">
          <div className="col-md-7">
            <div className="last-container">
              <div className="promo-section">
                <input
                  type="text"
                  placeholder="Enter a PromoCode"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button
                  type="button"
                  className="mx-4 btn btn-primary"
                  onClick={applyPromoCode}
                >
                  Apply Promocode
                </button>
              </div>

              <div className="button-checkout d-flex gap-4">
                <Link
                  to="/about-us"
                  className="btn back-btn"
                  style={{ backgroundColor: "rgb(212, 212, 212)" }}
                >
                  <FaLongArrowAltLeft /> Back
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="summary-box">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Rs {shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Grand Total:</span>
                <span>Rs {finalTotal.toFixed(2)}</span>
              </div>
              <Link to="/payment">
                <button type="button" className="btn btn-dark w-100 proceed-btn mt-3">
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default CartItems;
