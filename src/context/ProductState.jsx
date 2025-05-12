import React from 'react';
import ProductContext from './ProductContext';



const ProductState = (props) => {
    const product = "apple";
    return( <ProductContext.Provider value={product}>
        {props.children}
    </ProductContext.Provider>
)
};

export default ProductState
