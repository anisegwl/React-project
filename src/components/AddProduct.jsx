import React from "react";
import axios from "axios";
import "../styles/product.css"; // Use the same styling file as your product cards

const AddProduct = () => {
  const [product, setProduct] = React.useState({
    title: "",
    description: "",
    price: "",
    image: "",
    instock: "",
    discount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("instock", product.instock);
    formData.append("discount", product.discount);
    if (product.image) {
      formData.append("myfile", product.image);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/addproduct",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setProduct({
        title: "",
        description: "",
        price: "",
        image: "",
        instock: "",
        discount: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4" style={{ color: "#4A5568" }}>
        <b>Add New Product</b>
      </h3>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="our-card">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price (Rs)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">In Stock</label>
                <input
                  type="number"
                  name="instock"
                  value={product.instock}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Discount (Rs)</label>
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="text-end">
                <button type="submit" className="btn-gradient">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
