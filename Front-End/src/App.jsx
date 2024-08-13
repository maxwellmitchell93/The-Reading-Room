import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './assets/components/Header';
import Spinner from './assets/components/home/Spinner';
import BookDetails from './pages/BookDetails';
import MyCart from './pages/MyCart';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />  {/* Include the Header component */}

          {/* Cart Button */}
          <Link to="/cart" className="cart-button">
            My Cart
          </Link>

          {/* Main Content */}
          <Routes>
            <Route path="/" element={<Spinner />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/cart" element={<MyCart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
