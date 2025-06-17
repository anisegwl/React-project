import React, { useReducer, useState } from "react";
import ProductContext from "./ProductContext";
import image1 from "../assets/Tshirt4.jpg";
import image2 from "../assets/Tshirt3.jpg";
import image3 from "../assets/Tshirt2.jpg";
import image4 from "../assets/catTshirt.webp";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
  const initialProducts = [
    { _id: 1,
       img: image1,
        title: "Unisex Bird & Tree",
       description: "Khaki Casual Collar Short Sleeve Knitted Fabric Animal,Plants Embellished  Stretch Unisex Tops", price: 1799, 
       discountPrice: 1600,
        instock: 5 },
    { _id: 2,
       img: image2, 
       title: "Building Graphic Tee", 
       description: "This is good product from Khaki Casual Collar Short Sleeve Polyester Letter Stretch Clothing", price: 1500, 
       discountPrice: 1200, 
       instock: 5 },

    { _id: 3, 
      img: image3, 
      title: "Men-Geo Graphic Tee", 
      description: "Black Casual Collar Short Fabric Geometric,Letter Embellished Slight Stretch Men Clothing", price: 1640, 
      discountPrice: 1500, 
      instock: 3 },

    { _id: 4, 
      img: image4, 
      title: "Cat Graphic Tee", 
      description: "Astro cat graphic Tee, soft fabric with embeded style , suitable for casual wear.", 
      price: 950, 
      discountPrice: 700, 
      instock: 10 },
  ];
  const [product, setProducts] = useState(initialProducts);
  const [articles, setArticles] = useState([])
  const [state, dispatch] = useReducer(cartReducer, {
    products: initialProducts,
    cart: [],
  });
 const fetchData = async () => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles(data.articles);
    console.log("the data is", data.articles);
  } catch (error) {
    console.error(error);
  }
};
const allProduct = async (searchQuery="") => {
  try {
    const resp = await fetch(`http://localhost:5000/api/products/getallproduct?searchQuery=${searchQuery}`, {
      method: "GET", //read
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
    });
    const data = await resp.json();
    setProducts(data);
  
    console.log("data from api ", data)
  } catch (error) {
    console.error("Internal server error", error);
   
  }
};

 const editProduct = async (id, updateData) => {
    const { title, description, price, instock , discount } = updateData;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, price, instock, discount }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const data = await response.json();
      console.log("data from fake store api", data);
    } catch (error) {
      console.log("error in updating product", error);
    }
  };

  //delete product
   const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "mytoken",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      const data = await response.json();
      console.log("product deleted successfully", data);
    } catch (error) {
      console.log("error in deleting product", error);
      throw new Error("failed to delete product");
    }
  };

  return (
    <ProductContext.Provider value={{ state,articles, dispatch, deleteProduct, fetchData, allProduct, editProduct,product }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;