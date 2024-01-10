import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFromCart, incrementCart, decrementCart } from '../redux/slice/cartSlice';

const Cart = () => {
    const state = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    let cartItems;

    if (state && state.cart) {
        cartItems = state.cart;
        console.log("Cart state is", state)
    }
    else {
        cartItems = [];
    }

    const handelDeleteItem = (id) => {
        dispatch(deleteFromCart(id))
        console.log(id)
    }

    const handleIncrement = (item) => {
        dispatch(incrementCart(item.id))
    }
    const handleDecrement = (item) => {
        dispatch(decrementCart(item.id))
    }

    const totleCartPrice = state.cart.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.quantity * currentValue.price)
    }, 0)

    console.log("totleCartPrice", totleCartPrice)

    return (
        <div className='max-w-md mx-auto'>
        <h2 className='text-3xl font-bold mb-4'>Shopping Cart</h2>
        {cartItems.map((item) => (
            <div key={item.id} className='border border-gray-300 p-4 mb-4 rounded-lg shadow-md'>
                <img src={item.image} alt={item.title} className='w-full h-auto mb-4 rounded-md' />
                <h2 className='text-lg font-semibold mb-2'>{item.title}</h2>
                <p className='text-gray-700 mb-2'>Price: ${item.price}</p>
                <div className='flex items-center space-x-4'>
                    <span className='text-gray-700'>Quantity</span>
                    <button
                        onClick={() => handleDecrement(item)}
                        className='bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none hover:bg-blue-600'
                    >
                        -
                    </button>
                    <span className='text-xl font-semibold'>{item.quantity}</span>
                    <button
                        onClick={() => handleIncrement(item)}
                        className='bg-blue-500 text-white px-3 py-2 rounded-md focus:outline-none hover:bg-blue-600'
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => handelDeleteItem(item.id)}
                    className='bg-red-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none hover:bg-red-600'
                >
                    Delete Item
                </button>
            </div>
        ))}
        <h5 className='text-xl font-semibold mt-4'>Your cart total: $ {totleCartPrice}</h5>
    </div>
    
    )
}

export default Cart