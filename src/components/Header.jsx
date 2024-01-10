import React from 'react';
import { MdOutlineShoppingCart, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCategory } from '../redux/slice/api';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.cart)

    const onClickCart = () => {
        navigate("/cart")
        console.log(state.cart.length)
    }

    const handleLogoClick = () => {
        dispatch(clearCategory())
    }

    const sumOfCart = state.cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
    }, 0);

    return (
        <header className='flex relative items-center w-full h-[7vh] bg-[#131921] text-white  overflow-y-hidden'>
            <Link to='/' className='absolute left-[1vw]'>
                <img src='./images/amazon-logo-white.png' alt="amazon" onClick={handleLogoClick} className='h-[6vh] w-[10vw]' />
            </Link>

            <div className='block m-auto'>
                <div className='flex items-center flex-row h-[1vh] text-[20px]'>
                    <input
                        type="text"
                        placeholder="Search amazon.com"
                        className="pl-[0.4rem] text-[2rem] w-[35vw] h-[6vh] border-[0.3px] focus:border-[#ff9900] focus:outline-none border-[#3d3d3d]  items-center bg-white text-black rounded-lg "
                    />
                    <MdSearch className='text-[3rem] cursor-pointer' />
                </div>
            </div>

            <button className='flex flex-row items-center justify-center align-middle absolute right-[2vw]' onClick={onClickCart}>
                <span className='bg-lime-500 h-10 text-center w-10 rounded-full flex items-center justify-center'>
                    {sumOfCart}
                </span>
                <MdOutlineShoppingCart className='text-[2rem] m-auto' />
                <p className='text-[2rem] m-auto'>cart</p>
            </button>
        </header>
    );
};

export default Header;
