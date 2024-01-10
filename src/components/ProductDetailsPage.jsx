import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApi } from '../redux/slice/api';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../redux/slice/cartSlice';

const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.ecommerce)
    const { id } = useParams();

    let items;

    if (state.data) {
        items = state.data;
        console.log("Item object", items)
    }
    else {
        items = [];
    }
    useEffect(() => {
        dispatch(fetchApi(`products/${id}`))
        console.log("Item data fetched", items)
    }, [dispatch])

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent the Link from navigating
        console.log("Clicked Cart")
        dispatch(addToCart({ category: items.category,id: items.id, title: items.title, price: items.price, image: items.image, quantity: 1 }))
    }



    return (
        <div className='w-3/10 h-full border-2 m-auto p-4 rounded-lg shadow-lg'>
            <img src={items.image} alt={items.title} className='w-60 h-60 mx-auto mb-4  rounded-md' />
            <p className='text-2xl text-center mb-2'>{items.title}</p>
            <span className='text-yellow-400 block text-center mb-2'>
                {items.rating?.rate} ⭐ {items.rating?.count} users
            </span>
            <span className='text-xl text-center block mb-4'>${items.price}</span>
            <Link to="/cart" className='block text-center'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600' onClick={handleAddToCart} >
                    Add to Cart
                </button>
            </Link>
        </div>

    )
}

export default ProductDetailsPage