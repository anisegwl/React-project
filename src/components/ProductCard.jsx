import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import defaultImage from "../assets/cod.jpg";
import { toast } from "react-toastify";

const ProductCard = ({
  item,
  cart,
  dispatch,
  toggleMenu,
  menuVisible,
  openEditModal,
  handleDelete,
  selectedProduct,
  modalVisible,
  EditProductModal,
  editProduct
}) => {
  const saveMoney = item.price - item.discount;
  const inCart = cart.some((p) => p._id === item._id);

  const handleEditSave = (data) => {
    editProduct(item._id, data);
    toast.success("✏️ Product updated successfully!");
  };

  const handleDeleteClick = () => {
    handleDelete(item._id);
    toast.success("🗑️ Product deleted successfully!");
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="our-card position-relative">
        <img
          src={
            item.image && item.image[0]
              ? `http://localhost:5000/uploads/${item.image[0]}`
              : defaultImage
          }
          className="card-img-top"
          alt={item.title}
        />
        <div className="card-body">
          <div className="title-icon d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{item.title}</h5>
            <div className="dropdown-container">
              <BsThreeDotsVertical
                className="dropdown-toggle-icon"
                onClick={() => toggleMenu(item._id)}
              />
              {menuVisible[item._id] && (
                <div className="custom-dropdown">
                  <button
                    className="dropdown-btn edit"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="dropdown-btn delete"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="card-text">{item.description}</p>

          <div className="discount-para">
            <p className="our-price"><s>Rs {item.price}</s></p>
            <p className="our-price">Rs {saveMoney}</p>
          </div>

          <div className="save-money">
            <p>Save Rs {item.discount}</p>
          </div>

          <p className="our-stock">
            {item.instock > 0 ? `${item.instock} in stock` : "Out of stock"}
          </p>

          <div className="buttons">
            {inCart ? (
              <button
                className="btn-removeCart"
                onClick={() =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item })
                }
              >
                Remove from cart
              </button>
            ) : (
              <button
                className="btn-gradient"
                onClick={() =>
                  dispatch({ type: "ADD_TO_CART", payload: item })
                }
                disabled={item.instock <= 0}
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conditional modal rendering */}
      {modalVisible && selectedProduct?._id === item._id && EditProductModal && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => openEditModal(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default ProductCard;
