import React from 'react';
import ProductContext from './ProductContext';



const ProductState = (props) => {
    // const product = {
    //     title: 'Apple',
    //     price: 10.99,
    //     img: "",
    //     description: "This is Mustang apple"
    // }

    const products = [{
        "_id": 1,
        "title": "Apple",
        "price": 10.99,
        "img": "",
        "description": "This is Mustang apple"
    },
    {
        "_id": 2,
        "title": "Banana",
        "price": 5.99,
        "img": "",
        "description": "This is Banana"

    },
    {
        "_id": 3,
        "title": "Cherry",
        "price": 7.99,
        "img": "",
        "description": "This is Cherry"
    }]

    return (<ProductContext.Provider value={{products}}>
        {props.children}
    </ProductContext.Provider>
    )
};

export default ProductState
