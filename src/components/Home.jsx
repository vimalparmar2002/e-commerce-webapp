import React, { useEffect, useState, useRef } from 'react';
import { fetchApi } from '../redux/slice/api';
import { MdMenu, MdExpandCircleDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import { selectedCategoryItems,sortHighToLow,sortLowToHigh } from '../redux/slice/api';

const Home = () => {
	const state = useSelector((state) => state.ecommerce);
	const [selectedSortBy, setSelectedSortBy] = useState();
	const dispatch = useDispatch();
	const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
    const sortByItems = [
		{
			name: "Price",			
			value: "price",
			type: "High to Low"
		},
		{
			name: "Price",
			value: "price",
			type: "Low to High"
		},
		{   
			name: "Rating",
			value: "rate",
			type: "High to Low"
		},
		{   
			name: "Rating",
			value: "rate",
			type: "Low to High"
		},
		{   
			name: "Users",
			value: "count",
			type: "High to Low"
		},
		{   
			name: "Users",
			value: "count",
			type: "Low to High"
		}
	]

	let items;


	if (state && state.data && Array.isArray(state.data)) {
		items = (state.selectedCategory ? state.categoryData : state.data);
		console.log("Products array", items);
	}
	else {
		items = [];
		console.log("items is not an array")
	}

	useEffect(() => {
		dispatch(fetchApi("products"))
		console.log("Products data fetched")
	}, [])

	const handleCategory = (name) => {
		setSelectedSortBy(true);
		dispatch(selectedCategoryItems(name))
		console.log("Category name", name)
		console.log("selectedCategoryItems", items)
	}

	const handleSortBy = () => {
		setSelectedSortBy(!selectedSortBy);
		console.log("selectedSortBy", selectedSortBy)
	}

    const handleSortButton = (value,type) => {		
		setSelectedSortBy(value)
		if(type==="High to Low"){
			console.log("High to Low",value)
			dispatch(sortHighToLow(value))
		}
		else{
			console.log("Low to High",value)
			dispatch(sortLowToHigh(value))
		}
	}
	return (
		<div className='bg-gray-100 w-full'>
			<div className='flex border-b text-2xl border-gray-300 p-4 bg-gray-100' >
				<button className='border-r border-gray-300 pr-4'>
					<MdMenu className='text-3xl text-gray-700' />
				</button>
				{categories.map((name, index) => (
					<button
						key={index}
						className={`px-4  transition duration-300 ${state.selectedCategory === name ? 'text-blue-500 font-medium' : 'hover:text-gray-500'}`}
						onClick={() => handleCategory(name)}
					>
						{name}
					</button>
				))}
				<div className='relative'>
					<button
						className='flex items-center px-4 py-2 border-r border-black hover:text-blue-500'
						onClick={handleSortBy}
					>
						Sort By:{selectedSortBy} <MdExpandCircleDown className='ml-2' />
					</button>

					<ul
						className={`absolute right-0 mt-2 p-2 bg-white border border-black z-10 ${selectedSortBy ? '' : 'hidden'}`}
					>
						{sortByItems.map((item, index) => (
							<li
								key={index}
								onClick={()=>handleSortButton(item.value,item.type)}
								className='cursor-pointer py-1 px-2 hover:bg-gray-200'
							>
								<button>{item.name}: {item.type}</button>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-4'>
				{items.map((item) => (
					<div key={item.id} className='bg-white p-4 rounded-md shadow-md'>
						<ProductItem productData={item} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Home