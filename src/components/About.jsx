import React, { useContext, useEffect, useState } from "react";
import productContext from "../context/ProductContext";
import "../styles/product.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditProductModal from "./EditProdcutModal";
import defaultImage from "../assets/cod.jpg";
import { useParams } from "react-router-dom";

const About = () => {
  const {searchQuery} = useParams();
  const {
    state: { cart, products },
    dispatch,
    product,
    allProduct,
    editProduct,
    deleteProduct,
  } = useContext(productContext);

  const [menuVisible, setMenuVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("database", products);
  console.log("database mongo", product);


  const toggleMenu = (id) => {
    setMenuVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    editProduct( selectedProduct._id, updateData);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  useEffect(() => {
    allProduct(searchQuery);
  }, [searchQuery]);

  return (
    <div className="container my-4">
      <h3 className="text-center mb-5" style={{ fontSize: "40px", color: "#4A5568" }}>
        <b>Our Products</b>
      </h3>
      <div className="row">
        {products &&
          product.map((item) => {
            const saveMoney = item.price - item.discount
            const inCart = cart.some((p) => p._id === item._id);
            return (
              <div key={item._id} className="col-md-3 mb-4">
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
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="card-text">{item.description}</p>
                    <div className="discount-para">
                      <p className="our-price">
                        <s>Rs {item.price}</s>
                      </p>
                      <p className="our-price">Rs {saveMoney}</p>
                    </div>
                    <div className="save-money">
                      <p>Save Rs {item.discount} </p>
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
                {modalVisible && selectedProduct?._id === item._id && (
                  <EditProductModal
                    product={selectedProduct}
                    onClose={closeEditModal}
                    onSave={saveEdit}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default About;
