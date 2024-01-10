import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../redux/slice/cartSlice'

const ProductItem = ({ productData }) => {

	const dispatch = useDispatch();

	const handleAddToCart = (e) => {
		e.preventDefault(); // Prevent the Link from navigating
		console.log("Clicked Cart")
		dispatch(addToCart({ category:productData.category,id: productData.id, title: productData.title, price: productData.price, image: productData.image, quantity: 1 }))
	}

	return (
		<Link to={`/productDetails/${productData.id}`}>
			<div className='h-full w-full mx-auto bg-red rounded-lg overflow-hidden shadow-md transition transform hover:scale-105'>
				<img src={productData.image} alt={productData.title} className='w-[200px] h-[200px] mx-auto ' />
				<p className='text-2xl text-center mt-4 mb-2'>{productData.title}</p>
				<span className='text-yellow-400 block text-center mb-2'>
					{productData.rating.rate} ⭐ {productData.rating.count} users
				</span>
				<span className='block text-center text-gray-700 mb-4'>{productData.price} $</span>
				<button className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none' onClick={handleAddToCart}>
					Add to Cart
				</button>
			</div>
		</Link>
	)
}

export default ProductItem	