import React, { useState } from "react";
import ProductContext from "./ProductContext";
import image1 from "../assets/Tshirt4.jpg"
import image2 from "../assets/Tshirt3.jpg"
import image3 from "../assets/Tshirt2.jpg"
import image4 from "../assets/catTshirt.webp"

const ProductState = (props) => {
  // const product = {
  //   title: "apple",
  //   price: 100,
  //   description: "This is an apple from mustang123",
  // };

  const products = [
    {
      _id: 1,
      img : image1 ,
      title: "Unisex Bird & Tree",
      description: "Khaki Casual Collar Short Sleeve Knitted Fabric Animal,Plants Embellished  Stretch Unisex Tops",
      price: 1799,
      discountPrice : 1600,
      instock: 5,
    },
    {
      _id: 2,
      img : image2 ,
      title: "Building Graphic Tee",
      description: "This is good product from Khaki Casual Collar Short Sleeve Polyester Letter Stretch Clothing",
      price: 1500,
      discountPrice : 1200,
      instock: 5,
    },
    {
      _id: 3,
      img : image3,
      title: "Men-Geo Graphic Tee",
      description: "Black Casual Collar Short Fabric Geometric,Letter Embellished Slight Stretch Men Clothing",
      price: 1640,
      discountPrice : 1500,
      instock: 3,
    },
    {
      _id: 4,
      img : image4,
      title: "Cat Graphic tee",
      description: "Astro cat graphic Tee, soft fabric with embeded style , suitable for casual wear.",
      discountPrice : 700,
      price: 950,
      instock: 10,
    },
  ];
  const [user, setUser] = useState("");
  const fetchUser = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    let User = await response.json();
    console.log("this jsonplace user", User);
    setUser(User);
  };
  return (
    <ProductContext.Provider value={{ products, fetchUser, user }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;