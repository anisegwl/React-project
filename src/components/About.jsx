import React, { useContext } from 'react'
import ProductContext from '../context/ProductContext';

const About = () => {
    const context = useContext(ProductContext)
    const product = context;
    console.log (product);
  return (
    <div>
      This is About Page
      <h4> This is not phone this is fruit and name is {product}</h4>
    </div>
  )
}

export default About
