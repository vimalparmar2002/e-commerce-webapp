import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import ProductDetailsPage from './components/ProductDetailsPage'

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='productDetails/:id' element={<ProductDetailsPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App