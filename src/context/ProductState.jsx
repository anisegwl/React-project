import React, { useReducer, useState } from "react";
import ProductContext from "./ProductContext";
import image1 from "../assets/Tshirt4.jpg";
import image2 from "../assets/Tshirt3.jpg";
import image3 from "../assets/Tshirt2.jpg";
import image4 from "../assets/catTshirt.webp";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
  const initialProducts = [
    { _id: 1, img: image1, title: "Unisex Bird & Tree", description: "...", price: 1799, discountPrice: 1600, instock: 5 },
    { _id: 2, img: image2, title: "Building Graphic Tee", description: "...", price: 1500, discountPrice: 1200, instock: 5 },
    { _id: 3, img: image3, title: "Men-Geo Graphic Tee", description: "...", price: 1640, discountPrice: 1500, instock: 3 },
    { _id: 4, img: image4, title: "Cat Graphic Tee", description: "...", price: 950, discountPrice: 700, instock: 10 },
  ];

  const [state, dispatch] = useReducer(cartReducer, {
    products: initialProducts,
    cart: [],
  });

  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const u = await res.json();
    setUser(u);
  };

  return (
    <ProductContext.Provider value={{ state, dispatch, fetchUser, user }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
