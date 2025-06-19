
import React, { useContext, useEffect, useState } from "react";
import productContext from "../context/ProductContext";
import "../styles/product.css";
import EditProductModal from "./EditProdcutModal";
import ProductCard from "./ProductCard";

const WomenProducts = () => {
  const {
    state: { cart },
    dispatch,
    product,
    allProduct,
    editProduct,
    deleteProduct,
  } = useContext(productContext);

  const [menuVisible, setMenuVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    editProduct(selectedProduct._id, updateData);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  useEffect(() => {
    allProduct();
  }, []);

  const womenProducts = product.filter(
    (item) => item.category && item.category.toLowerCase() === "women"
  );

  return (
    <div className="container my-4">
      <h3 className="text-center mb-5" style={{ fontSize: "40px", color: "#4A5568" }}>
        <b>Women Collection</b>
      </h3>
      <div className="row">
        {womenProducts.map((item) => (
          <ProductCard
            key={item._id}
            item={item}
            cart={cart}
            dispatch={dispatch}
            toggleMenu={toggleMenu}
            menuVisible={menuVisible}
            openEditModal={openEditModal}
            handleDelete={handleDelete}
            modalVisible={modalVisible}
            selectedProduct={selectedProduct}
            EditProductModal={EditProductModal}
            editProduct={editProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default WomenProducts;
