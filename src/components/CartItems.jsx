import React, { useContext } from 'react'
import ProductContext from '../context/ProductContext';
import { MdDelete } from "react-icons/md";

const CartItems = () => {
    const context = useContext(ProductContext)
    const { state: { cart }, dispatch, } = context;
    console.log("this is cart", cart);

    return (
        <div className='container'>
            <h4>this is cart items</h4>


            <div className='product-container'>
                <ul>
                    {cart && cart.map((item) => {
                        return (
                            <li key={item._id}>
                                <div className='row'>
                                    <div className='col-md-2'>
                                        <img src={item.img} style={{ height: '100px', width: '100px' }} alt='cart-image'></img>
                                    </div>
                                    <div className='col-md-2'>
                                        <h5>{item.title}</h5>
                                    </div>
                                    <div className='col-md-2'>
                                        <h5>{item.price}</h5>
                                    </div>
                                    <div className='col-md-2'>
                                        <select value="1"
                                            onChange={(e) => {
                                                dispatch({
                                                    type: 'UPDATE_CART_ITEM',
                                                    payload: e.target.value
                                                })
                                            }}
                                            className='form-control'>
                                            {[...Array(item.instock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='col-md-2'>
                                        <button className ='btn btn-danger' onClick={() => {
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: item,
                                            })
                                        }}>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default CartItems
