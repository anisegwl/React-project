import React from 'react'
import ProductContext from "./ProductContext"; 



const HomeProduct = (props) => {
  const bannerProducts = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "https://picsum.photos/200/300",
    },
    
    {
      id: 2,
      name: "Product 2",
      price: 200,
      image: "https://picsum.photos/200/301",
    },

  ]

  return (
     <ProductContext.Provider value={{ bannerProducts }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default HomeProduct
