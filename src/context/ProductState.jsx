import React, { useState } from 'react';
import ProductContext from './ProductContext';

const ProductState = (props) => {
  const products = [
    {
      _id: 1,
      title: 'Apple',
      price: 10.99,
      img: '',
      description: 'This is Mustang apple',
    },
    {
      _id: 2,
      title: 'Banana',
      price: 5.99,
      img: '',
      description: 'This is Banana',
    },
    {
      _id: 3,
      title: 'Cherry',
      price: 7.99,
      img: '',
      description: 'This is Cherry',
    },
  ];

  // initialize user state
  const [user, setUser] = useState("user");

  // fetch and store a user
  const fetchUser = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      const data = await response.json();
      console.log('This is the user from JSONPlaceholder:', data);
      setUser(data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, user, fetchUser }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
